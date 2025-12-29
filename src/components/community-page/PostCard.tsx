import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/lib/index';
import { ThumbsUp } from 'lucide-react';
import { formatRelativeDate } from '@/utils/index';
import type { Post } from '@/types-interface/index';

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
    <div className="flex h-[216px] w-[944px] flex-col gap-4">
      <Item
        className="h-full w-full items-start justify-start"
        variant="default"
        asChild
      >
        <a href="" target="_blank" rel="noopener noreferrer">
          <ItemContent className="h-full">
            <div className="flex flex-col gap-2">
              <ItemDescription className="text-oz-gray-dark text-[12px]">
                {category}
              </ItemDescription>
              <ItemTitle className="text-[18px]">{title}</ItemTitle>
              <ItemDescription className="text-oz-gray text-[14px]">
                {content_preview}
              </ItemDescription>
            </div>
            <div className="mt-auto flex w-full items-center justify-between">
              <ItemActions className="text-oz-gray-white-dark mt-auto flex gap-2">
                <ThumbsUp className="text-oz-gray-white-dark" />
                <p className="flex gap-1 text-[12px]">
                  <span>좋아요</span>
                  <span>{like_count}</span>
                </p>
                <p className="flex gap-1 text-[12px]">
                  <span>댓글</span>
                  <span>{comment_count}</span>
                </p>
                <p className="flex gap-1 text-[12px]">
                  <span>조회수</span>
                  <span>{view_count}</span>
                </p>
              </ItemActions>
              <div className="flex items-center gap-2">
                <img
                  src={author.profile_img_url || '/src/assets/user.png'}
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
          </ItemContent>
          {thumbnail_img_url && (
            <ItemMedia className="ml-10 h-[168px] w-[228px]">
              <img
                src={thumbnail_img_url}
                alt="썸네일"
                className="bg-oz-gray-light h-full w-full rounded-lg object-cover"
              />
            </ItemMedia>
          )}
        </a>
      </Item>
    </div>
  );
};

export default PostCard;
