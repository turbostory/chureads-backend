// 게시물 관련 모든 API 엔드포인트를 관리하는 라우터
import express from "express";
import { ObjectId } from "mongodb";
import { generateTags } from "../services/tagService.js";
import { broadcastToClients } from "../sse/sseManager.js";

// Express에서 제공하는 미니 애플리케이션 객체를 생성
const postRouter = express.Router();

let collection;

// 라우터 초기화 함수
export const initialRouter = (db) => {
  collection = db.collection("posts");
};

// GET /posts - 모든 게시물 조회
postRouter.get("/", async (req, res) => {
  try {
    // TODO:모든 게시물 조회
    const posts = await collection.find().toArray();
    console.log("🚀 ~ posts:", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET /posts/:id - 특정 게시물 조회
postRouter.get("/:id", async (req, res) => {
  try {
    // TODO: 특정 게시물 조회
    const { id } = req.params;
    const posts = await collection.findOne({
      _id: new ObjectId(id),
    });
    // 응답
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST /posts - 새 게시물 작성
postRouter.post("/", async (req, res) => {
  // 요청 body에서 게시물 데이터를 받아서 데이터베이스에 저장
  const post = req.body; // 객체
  try {
    // GPT에게 태그 추천
    const tags = await generateTags(post.content);

    // TODO: 새 게시물 작성
    const newItem = {
      ...post,
      tags, // chatGPT가 생성할 추천 태그들
      likeCount: 0, // 좋아요 수
      likedUsers: [], // 좋아요 누른 UserID 목록
      createdAt: new Date(),
    };

    // 데이터베이스에 추가
    const result = await collection.insertOne(newItem);

    // TODO: 🔔🔔새 게시물 알림을 모든 클라이언트에게 전송
    broadcastToClients("newPost", {
      postId: result.insertedId,
      userName: newItem.userName,
      content:
        newItem.content.substring(0, 20) +
        (newItem.content.length > 20 ? "..." : ""),
      createdAt: newItem.createdAt,
      message: `${newItem.userName}님이 새 글을 작성했습니다.`,
    });

    // 응답
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// PUT /posts/:id - 특정 게시물 수정
postRouter.put("/:id", async (req, res) => {
  try {
    // TODO: 특정 게시물 수정
    const { id } = req.params;
    const editedPost = req.body;

    const result = await collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { content: editedPost.content, updatedAt: new Date() },
      }
    );
    //응답
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE /posts/:id - 특정 게시물 삭제
postRouter.delete("/:id", async (req, res) => {
  // URL 파라미터에서 게시물 ID를 받아서 해당 게시물을 삭제
  try {
    // TODO: 특정 게시물 삭제
    const { id } = req.params;
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    // 응답
    result.deletedCount
      ? res.status(200).json({
          message: "Post deleted",
          id,
        })
      : res.status(404).json({
          message: "Post not found",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

export default postRouter;
