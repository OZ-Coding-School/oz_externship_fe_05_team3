import { useState, useEffect } from 'react';
import {
  Card,
  CardDescription,
  CardAction,
  CardTitle,
  CardContent,
  cn,
} from '@/lib/index';
import { ThumbsUp } from 'lucide-react';
import { formatRelativeDate, getCategoryNameById } from '@/utils/index';
import type { Post } from '@/types/index';
import { useAuthStore } from '@/store';
import { useCommunityPageData } from '@/hooks/index';
import { Link } from 'react-router';
import { getRoutes } from '@/routes';

interface PostCardProps {
  postcard: Post;
}

const PostCard = ({ postcard }: PostCardProps) => {
  const { user } = useAuthStore();
  // const user = { id: 1 }; // 로그인된 상태 시뮬레이션
  const {
    id,
    author,
    category,
    category_id,
    title,
    content_preview,
    thumbnail_img_url,
    created_at,
    like_count,
    comment_count,
    view_count,
  } = postcard;

  // API가 category를 반환하지 않으므로 category_id로부터 계산
  const displayCategory = category || getCategoryNameById(category_id);

  const [isLiked, setIsLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(like_count);
  // const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (user) {
      const likedPosts = JSON.parse(
        localStorage.getItem(`liked_posts_${user.id}`) || '[]'
      );
      const hasLiked = likedPosts.includes(id);
      setIsLiked(hasLiked);
      setCurrentLikeCount(hasLiked ? like_count + 1 : like_count);
    }
  }, [user, id, like_count]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      // alert('로그인이 필요한 서비스입니다.');
      return;
    }

    const storageKey = `liked_posts_${user.id}`;
    const likedPosts = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (isLiked) {
      const newLikedPosts = likedPosts.filter(
        (postId: number) => postId !== id
      );
      localStorage.setItem(storageKey, JSON.stringify(newLikedPosts));
      setIsLiked(false);
      setCurrentLikeCount((prev) => prev - 1);
    } else {
      likedPosts.push(id);
      localStorage.setItem(storageKey, JSON.stringify(likedPosts));
      setIsLiked(true);
      setCurrentLikeCount((prev) => prev + 1);
      // setIsBouncing(true);
    }
  };

  return (
    <div className="flex h-[216px] w-full max-w-[944px] min-w-0 flex-col items-center justify-center gap-4">
      <Card className="flex h-full w-full items-center justify-between">
        <CardContent className="flex h-full w-full items-center justify-between gap-4">
          <div className="flex h-full flex-1 flex-col justify-between">
            <div className="flex flex-col gap-2">
              <CardDescription className="text-oz-gray-dark text-[12px]">
                {displayCategory}
              </CardDescription>
              <CardTitle className="line-clamp-2 text-[18px]">
                {title}
              </CardTitle>
              <CardDescription className="text-oz-gray text-[14px]">
                {content_preview}
              </CardDescription>
            </div>
            <div className="flex w-full items-center justify-between">
              <CardAction className="text-oz-gray-white-dark mt-auto flex items-center justify-center gap-2">
                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={handleLikeClick}
                >
                  <ThumbsUp
                    className={cn(
                      'hover:text-oz-purple transition-all duration-300',
                      isLiked ? 'text-oz-purple' : 'text-oz-gray-white-dark'
                    )}
                  />
                  <p
                    className={cn(
                      'hover:text-oz-purple text-[12px] transition-colors duration-300',
                      isLiked
                        ? 'text-oz-purple hover:text-oz-purple font-semibold'
                        : 'hover:text-oz-purple'
                    )}
                  >
                    좋아요&nbsp;{currentLikeCount}
                  </p>
                </div>
                <p className="text-[12px]">댓글&nbsp;{comment_count}</p>
                <p className="text-[12px]">조회수&nbsp;{view_count}</p>
              </CardAction>
              <div className="flex items-center gap-2">
                <img
                  src={author.profile_image_url || '/src/assets/user.png'}
                  alt="프로필"
                  className="bg-oz-gray-light h-[24px] w-[24px] rounded-full object-cover"
                />
                <span className="text-oz-gray-dark hidden text-[12px] min-[600px]:flex">
                  {author.nickname}
                </span>
                <span className="text-oz-gray hidden text-[12px] min-[700px]:flex">
                  {formatRelativeDate(created_at)}
                </span>
              </div>
            </div>
          </div>
          {thumbnail_img_url && (
            <div className="hidden h-[163px] w-[228px] shrink-0 items-center justify-center min-[800px]:flex">
              <img
                src={thumbnail_img_url}
                alt="썸네일"
                className="bg-oz-gray-light h-full w-full rounded-lg object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const PostCardEmptySection = () => {
  return (
    <div className="flex h-80 w-full flex-col items-center justify-center gap-4 text-center">
      <CardContent className="flex h-full w-full flex-col items-center justify-center gap-4">
        <CardTitle className="text-lg font-semibold text-gray-500">
          찾는 게시글이 없습니다.
        </CardTitle>
        <CardDescription className="text-sm text-gray-400">
          다른 키워드로 검색해보시거나 필터를 초기화해보세요.
        </CardDescription>
      </CardContent>
    </div>
  );
};

const PostCardSection = () => {
  const { posts } = useCommunityPageData();
  return posts && posts.length > 0 ? (
    <>
      {posts.map((post: Post) => (
        <Link
          to={getRoutes.communityDetail(post.id)}
          key={post.id}
          className="flex w-full justify-center"
        >
          <PostCard postcard={post} />
        </Link>
      ))}
      <hr className="mt-5 mb-10 w-full" />
    </>
  ) : (
    <PostCardEmptySection />
  );
};

export default PostCardSection;
