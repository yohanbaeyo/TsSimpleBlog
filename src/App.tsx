// import logo from './logo.svg';
import { timingSafeEqual } from 'crypto';
import { title } from 'process';
import React, {useState} from 'react';
import './App.css';

class Post {
  title:string;
  goodCnt:number;
  constructor(newTitle:string) {
    this.title= newTitle;
    this.goodCnt=0;
  }
}

function App() {
  let [posts, postsModifier] = useState(Array<Post>());
  function titleModify(newTitle:string, idx:number) {
    let tmpPosts = [...posts];
    tmpPosts[idx].title=newTitle;
    postsModifier(tmpPosts);
  }

  function cntModify(newCnt:number, idx:number, isReplace:boolean) {
    let tmpPosts = [...posts];
    if(isReplace) {
      tmpPosts[idx].goodCnt = newCnt;
    } else {
      tmpPosts[idx].goodCnt += newCnt;
    }
    postsModifier(tmpPosts);
  }
  function askTitleModify(idx:number) {
    let newTitle:string = prompt("Input title to change.", "No Title")!;
    if(!newTitle) {
      newTitle=" ";
    }
    titleModify(newTitle, idx);
  }

  function alignByABCs() {
    let tmpPosts = [...posts];
    // tmpPosts = ['g', ';a', 'sd'];
    tmpPosts.sort((a,b)=>{
      // let x = a.title.toLowerCase();
      // let y = b.title.toLowerCase();
      return a.title.toLowerCase()<b.title.toLowerCase()?-1:0;
      // if(x<y) return -1;
      // if(x>y) return 1;
      // else return 0;
    });
    console.log(tmpPosts);
    postsModifier(tmpPosts);
  }

  function makeNewItem() {
    let tmpPosts = [...posts];
    tmpPosts.push(new Post("Lorem"));
    postsModifier(tmpPosts);
  }
  return (
    <div className="App">
      <div className="black-nav">
        dsadsa
        <button onClick={()=>{alignByABCs();}}>정렬</button>
        <button onClick={()=>{makeNewItem();}}>새 항목 만들기</button>
      </div>
      { posts ? posts.map((_,index)=>(
        <div className="post">
          <h3> {posts[index].title} </h3>
          <p>Lorem Ipsum</p>
          <span onClick={()=>{cntModify(1,index,false);}}>👍</span> {posts[index].goodCnt}
          <span style={{}} onClick={()=>{ askTitleModify(index) }}>🛠</span>
          <hr/>     💡📌
        </div>
      )):""}
      <Modal/>
    </div>
  );
}

function Modal() {
  return(
    <>
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
    </>
  )
}

export default App;
