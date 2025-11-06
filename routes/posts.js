// 게시물 관련 모든 API 엔드포인트를 관리하는 라우터
import express from "express";

// Express에서 제공하는 미니 애플리케이션 객체를 생성
const postRouter = express.Router();

// GET /posts - 모든 게시물 조회
postRouter.get("/", async (req, res) => {
  try {
    // TODO:모든 게시물 조회
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
});

// GET /posts/:id - 특정 게시물 조회
postRouter.get("/:id", async (req, res) => {
  try {
    // TODO: 특정 게시물 조회
  } catch (error) {
    console.log(error);
  }
});

// POST /posts - 새 게시물 작성
postRouter.post("/", async (req, res) => {
  // 요청 body에서 게시물 데이터를 받아서 데이터베이스에 저장
  try {
    // TODO: 새 게시물 작성
  } catch (error) {
    console.log(error);
  }
});

// PUT /posts/:id - 특정 게시물 수정
postRouter.put("/:id", async (req, res) => {
  try {
    // TODO: 특정 게시물 수정
  } catch (error) {
    console.log(error);
  }
});

// DELETE /posts/:id - 특정 게시물 삭제
postRouter.delete("/:id", async (req, res) => {
  // URL 파라미터에서 게시물 ID를 받아서 해당 게시물을 삭제
  try {
    // TODO: 특정 게시물 삭제
  } catch (error) {
    console.log(error);
  }
});

export default postRouter;
