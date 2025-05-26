import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigator = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedStack, setSelectedStack] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/posts');
        const sortedPosts = res.data.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
      } catch (error) {
        console.error('게시물을 가져오는 데 오류가 발생했습니다:', error);
      }
    };
    fetchPosts();
  }, []);

  const handlePost = (id) => {
    navigator(`/post/${id}`);
  };

  const handleStackClick = (stack) => {
    setSelectedStack(stack);
  };

  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const stackMatch = selectedStack === '전체' || post.stack === selectedStack;
    return titleMatch && stackMatch;
  });

  return (
    <Container>
      <SearchLine>
        <Search
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="제목으로 검색..."
        />
        <SearchButton size={30} onClick={() => setSearchTerm(searchInput)} />
      </SearchLine>

      <NavLine>
        {['전체', '자바', '데이터베이스', '자바스크립트', '리액트', 'CSS', 'JSP'].map((stack) => (
          <Stack
            key={stack}
            onClick={() => handleStackClick(stack)}
            style={{ fontWeight: selectedStack === stack ? 'bold' : 'normal' }}
          >
            {stack}
          </Stack>
        ))}
      </NavLine>

      <PostTop>
        <PostColumn style={{ width: '70px' }}>No</PostColumn>
        <PostColumn style={{ width: '160px' }}>카테고리</PostColumn>
        <PostColumn style={{ width: '450px' }}>제목</PostColumn>
        <PostColumn style={{ width: '160px' }}>글쓴이</PostColumn>
        <PostColumn style={{ width: '180px' }}>작성날짜</PostColumn>
      </PostTop>

      {filteredPosts.map((post) => (
        <PostLine key={post.id} onClick={() => handlePost(post.id)}>
          <Post style={{ width: '70px' }}>{post.id}</Post>
          <Post style={{ width: '160px' }}>{post.stack}</Post>
          <Post style={{ width: '450px' }}>{post.title}</Post>
          <Post style={{ width: '160px' }}>{post.userId}</Post>
          <Post style={{ width: '180px' }}>{post.createdAt}</Post>
        </PostLine>
      ))}

      <PostButton onClick={() => navigator('/postform')}>글쓰기</PostButton>
    </Container>
  );
};

export default HomePage;


const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  min-height: calc(100vh - 70px);
  padding: 20px;
`;

const SearchLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Search = styled.input`
  margin-top: 70px;
  width: 315px;
  height: 40px;
  border: 4px solid #3b4890;
  font-size: 16px;
  padding: 0 10px;
`;

const SearchButton = styled(FaSearch)`
  cursor: pointer;
  margin-top: 70px;
`;

const NavLine = styled.div`
  margin-top: 70px;
  font-size: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Stack = styled.div`
  margin-right: 40px;
  cursor: pointer;

  &:hover {
    color: #fad555;
  }
`;

const PostTop = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  border-top: 3px solid black;
  border-bottom: 0.5px solid black;
  font-size: 20px;
  height: 50px;
  align-items: center;
  background: #ccc;
`;

const PostColumn = styled.div`
  font-weight: 450;
`;

const PostLine = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid black;
  height: 50px;
  font-size: 20px;
  align-items: center;
  cursor: pointer;
`;

const Post = styled.div`
  font-weight: 450;
`;

const PostButton = styled.button`
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 0px;

  &:hover {
    opacity: 0.8;
    background: #fad555;
    color: white;
  }
`;
