import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


const commonFont = `'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(res.data);

        const userStr = sessionStorage.getItem('loginUser');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user.userId === res.data.userId) {
            setIsAuthor(true);
          }
        }

       
        const commentRes = await axios.get(`http://localhost:3001/comments?postId=${id}`);
        setComments(commentRes.data);
      } catch (err) {
        console.error('데이터를 불러오는 데 실패했습니다:', err);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleAddComment = async () => {
    const userStr = sessionStorage.getItem('loginUser');
    if (!userStr) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const user = JSON.parse(userStr);
    const newComment = {
      postId: parseInt(id),
      userId: user.userId,
      createdAt: today,
      content: commentText,
    };

    try {
      await axios.post(`http://localhost:3001/comments`, newComment);
      const updatedComments = await axios.get(`http://localhost:3001/comments?postId=${id}`);
      setComments(updatedComments.data);
      setCommentText('');
    } catch (err) {
      console.error('댓글 등록 실패:', err);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <Container>
      <Wrapper>
        <form>
          <h2>게시판 상세보기</h2>
          <Title 
            type="text" 
            value={post.title} 
            readOnly={!isAuthor}
            onChange={(e) => isAuthor && setPost({...post, title: e.target.value})}
          />
          <SelectLine>
            작성자
            <Writer value={post.userId} readOnly />
            <Select 
              value={post.stack} 
              disabled={!isAuthor}
              onChange={(e) => isAuthor && setPost({...post, stack: e.target.value})}
            >
              <option value="자바">자바</option>
              <option value="데이터베이스">데이터베이스</option>
              <option value="자바스크립트">자바스크립트</option>
              <option value="리액트">리액트</option>
              <option value="CSS">CSS</option>
              <option value="JSP">JSP</option>
            </Select>
          </SelectLine>
          <Content 
            value={post.content} 
            readOnly={!isAuthor}
            onChange={(e) => isAuthor && setPost({...post, content: e.target.value})}
          />
          <ButtonLine>
            {isAuthor && (
              <>
                <Button 
                  type="button" 
                  onClick={() => {
                    axios.put(`http://localhost:3001/posts/${id}`, post)
                      .then(() => {
                        alert('수정되었습니다.');
                        navigate('/');
                      })
                      .catch(err => {
                        console.error('수정 실패:', err);
                        alert('수정 실패');
                      });
                  }}
                >
                  수정하기
                </Button>
                <Button 
                  type="button" 
                  onClick={() => {
                    if (window.confirm('정말 삭제하시겠습니까?')) {
                      axios.delete(`http://localhost:3001/posts/${id}`)
                        .then(() => {
                          alert('삭제되었습니다.');
                          navigate('/');
                        })
                        .catch(err => {
                          console.error('삭제 실패:', err);
                          alert('삭제 실패');
                        });
                    }
                  }}
                >
                  삭제하기
                </Button>
              </>
            )}
            <Button type="button" onClick={() => navigate('/')}>뒤로가기</Button>
          </ButtonLine>
        </form>

        <CommentSection>
          <h3>댓글</h3>
          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentTop key={comment.id}>
                <UserInfo >{comment.userId}</UserInfo> 
                <CommentDate>{comment.createdAt}</CommentDate>
              </CommentTop>
              <CommentBottom>
                <Comment>{comment.content}</Comment>
              </CommentBottom>
            </div>  
          ))}
          <CommentInputArea>
            <textarea 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              placeholder="댓글을 입력하세요"
              style={{fontFamily: `${commonFont}`}}
            />
            <Button onClick={handleAddComment} style={{height: '80px', marginRight:'0px', fontSize:'14px'}}>댓글등록</Button>
          </CommentInputArea>
        </CommentSection>
      </Wrapper>
    </Container>
  );
};

export default PostDetail;


const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  width: 80vw;
  border: 1px solid black;
  margin-top: 100px;
`;

const Title = styled.input`
  width: 50vw;
  height: 5vh;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

const Content = styled.textarea`
  justify-content: flex-start;
  font-size: 20px;
  font-family: ${commonFont};
  width: 50vw;
  height: 50vh;
  padding: 10px;
  resize: none;
`;

const SelectLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center ;
  font-size: 20px;
  width: 50vw;
  height: 5vh;
  margin-bottom: 20px;
`;

const Writer = styled.input`
  font-size: 16px;
  width: 20vw;
  height: 5vh;
  margin-right: 30px;
  margin-left: 10px;
`;

const Select = styled.select`
  font-size: 16px;
  height: 5vh;
`;

const ButtonLine = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-right: 10px;
  width: 100px;
  border: 0.5px solid black;
  border-radius: 0;
`;

const CommentSection = styled.div`
  width: 50vw;
  margin-top: 40px;
  
`;

const CommentTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 8px 0;
`;

const CommentInputArea = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;

  textarea {
    width: 100%;
    height: 80px;
    padding: 10px;
    resize: none;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const CommentBottom = styled.div`
  display: flex;
  justify-content: flex-start;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;

`
const UserInfo = styled.strong`
  padding-left: 10px;
`

const CommentDate = styled.div`
  padding-right: 30px;
`

const Comment = styled.div`
  padding-left: 10px;
  font-family: ${commonFont};
`