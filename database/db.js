// 데이터베이스 관리
import { MongoClient } from "mongodb";

let db = null;

// MongoDB 연결 함수
export const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    const DB_NAME = process.env.DB_NAME;
    console.log("🚀 ~ connectDB ~ MONGODB_URI:", MONGODB_URI);

    // 이미 연결 되어있는 경우엔 기존 db 반환
    if (db) {
      return db;
    }
    // 연결되어있지 않다면 새로운 연결 생성
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`🥇MongoDB 연결 성공: ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error(`❌MongoDB 연결 실패: ${error}`);
    process.exit(1); // 프로그램 강제종료
  }
};
