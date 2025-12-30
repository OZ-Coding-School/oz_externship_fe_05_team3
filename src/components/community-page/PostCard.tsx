import {
  Card,
  CardDescription,
  CardAction,
  CardTitle,
  CardContent,
} from '@/lib/index';
import { ThumbsUp } from 'lucide-react';
import { formatRelativeDate } from '@/utils/index';
import type { Post } from '@/types/index';

interface PostCardProps {
  postcard: Post;
}

const PostCard = ({ postcard }: PostCardProps) => {
  const {
    author,
    category,
    title,
    content_preview,
    thumbnail_img_url,
    created_at,
    like_count,
    comment_count,
    view_count,
  } = postcard;

  return (
    <div>
      <div className="flex h-[216px] w-[944px] flex-col items-center justify-center gap-4">
        <div className="h-full w-full items-center justify-between">
          <Card className="flex h-full w-full items-center justify-between">
            <CardContent className="flex h-full w-full items-center justify-between gap-4">
              <div className="flex h-full w-full flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <CardDescription className="text-oz-gray-dark text-[12px]">
                    {category}
                  </CardDescription>
                  <CardTitle className="text-[18px]">{title}</CardTitle>
                  <CardDescription className="text-oz-gray text-[14px]">
                    {content_preview}
                  </CardDescription>
                </div>
                <div className="flex w-full items-center justify-between">
                  <CardAction className="text-oz-gray-white-dark mt-auto flex items-center gap-2">
                    <ThumbsUp className="text-oz-gray-white-dark" />
                    <p className="text-[12px]">좋아요&nbsp;{like_count}</p>
                    <p className="text-[12px]">댓글&nbsp;{comment_count}</p>
                    <p className="text-[12px]">조회수&nbsp;{view_count}</p>
                  </CardAction>
                  <div className="flex items-center gap-2">
                    <img
                      src={author.profile_image_url || '/src/assets/user.png'}
                      alt="프로필"
                      className="bg-oz-gray-light h-[24px] w-[24px] rounded-full object-cover"
                    />
                    <span className="text-oz-gray-dark text-[12px]">
                      {author.nickname}
                    </span>
                    <span className="text-oz-gray text-[12px]">
                      {formatRelativeDate(created_at)}
                    </span>
                  </div>
                </div>
              </div>
              {thumbnail_img_url && (
                <div className="flex h-[163px] w-[228px] items-center justify-center">
                  <img
                    src={thumbnail_img_url}
                    alt="썸네일"
                    className="bg-oz-gray-light h-full w-full rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
