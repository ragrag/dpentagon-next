import { useRouter } from 'next/router';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { transitions } from 'react-stack-grid';
import Post from '../../lib/interfaces/post';
import User from '../../lib/interfaces/user';
import { PostsFetchResponse } from '../../lib/requests/fetchers/postsFetcher';
import UserContactInfo from '../UserProfile/UserContactInfo';
import PostItem from './PostItem';
const { scaleDown } = transitions;
export type Props = {
  data: PostsFetchResponse[];
  size: number;
  setSize: (size: number) => void;
};
const randomHeightsMap: Map<number, number> = new Map<number, number>();

export default function PaginatedPostList({ data, size, setSize }: Props) {
  const router = useRouter();

  const [modalVisible, setModalVisibility] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User>(null);
  return (
    <>
      <InfiniteScroll
        dataLength={data.reduce((prev, cur) => {
          return prev + cur.posts.length;
        }, 0)} //This is important field to render the next data
        next={() => {
          setSize(size + 1);
        }}
        hasMore={data[data.length - 1].hasMore}
        loader={null}
      >
        <div id="post-grid">
          {/* <StackGrid
            columnWidth={250}
            // appear={scaleDown.appear}
            // appeared={scaleDown.appeared}
            // enter={scaleDown.enter}
            // entered={scaleDown.entered}
            // leaved={scaleDown.leaved}
          > */}
          {data.map((postData, index) => {
            return postData.posts.map((post: Post) => {
              let randomHeight;
              if (randomHeightsMap.get(post.id)) randomHeight = randomHeightsMap.get(post.id);
              else {
                randomHeight = Math.floor(120 + Math.random() * (250 + 1 - 120));
                randomHeightsMap.set(post.id, randomHeight);
              }
              return (
                <PostItem
                  setUserModalVisibility={setModalVisibility}
                  setSelectedUser={setSelectedUser}
                  width={250}
                  height={250}
                  post={post}
                  key={post.id}
                ></PostItem>
              );
            });
          })}
          {/* </StackGrid> */}
        </div>
      </InfiniteScroll>

      <UserContactInfo visible={modalVisible} setModalVisibility={setModalVisibility} user={selectedUser} readOnly={true}></UserContactInfo>
    </>
  );
}
