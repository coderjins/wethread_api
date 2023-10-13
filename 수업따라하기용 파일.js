const createThread = async(req,res)=>{
  console.log("function start");
  //1-1. request body에서 사용자의 게시글 정보를 받아온다.
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.body.userId;

  console.log("데이터: ",title,content,userId);
  //1-2. posts의 title, content, usder_id Database에 게시물 정보를 입력

  const postData = await appDatasource.query(`
    INSERT INTO posts (
      title,
      content,
      user_id
    ) VALUES (
      '${title}',
      '${content}',
      '${userId}'
    )
  `);
  //1-3. DB에 저장되었는지 확인하기
  console.log("TYPEORM RETURN DATA: ", postData);  
  //1-4. front에게 저장 잘되었다고 전달
  return res.status(201).json({"message":"게시완료"});
};


//전체 게시글 조회
const getAllPosts = async(req,res) => {
  //1-1. 프론트로부터 받아올 데이터 없음.
  //1-2. Database 에서 모든 게시글 정보를 불러옵니다. (작성자의 이름까지)
  const postData = await appDatasource.query(`
  SELECT 
    u.id, 
    p.title, 
    p.content, 
    p.user_id AS userId, 
    p.created_at AS createdAt 
    FROM users u JOIN posts p 
  ON u.id=p.user_id;
`)
  //1-3. 데이터 잘 가져왔는지 확인하기.
  console.log("데이터: ",postData); // postData.length 로 확인하기도 함
  
  //1-4. front에게 게시글 데이터를 보내기
  return res.status(200).json({"message":"SUCCCESS","postData": postData});
};
//
app.post("/posts",createThread);
app.get("/posts",getAllPosts);