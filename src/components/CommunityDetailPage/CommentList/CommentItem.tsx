// src/components/CommunityDetailPage/CommentList/CommentItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CommentItemProps {
  comment: {
    id: number;
    author: {
      nickname: string;
      profileImageUrl: string;
    };
    content: string;
    createdAt: string;
  };
  variant: 'guest' | 'member' | 'author';
  isUpdating: boolean;
  isDeleting: boolean;
  onEdit: (comment: any) => void;
  onDelete: (commentId: number) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  editingCommentId: number | null;
  editingContent: string;
  onEditingContentChange: (content: string) => void;
}

export function CommentItem({
  comment,
  variant,
  isUpdating,
  isDeleting,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  editingCommentId,
  editingContent,
  onEditingContentChange,
}: CommentItemProps) {
  const isEditing = editingCommentId === comment.id;

  return (
    <div className="animate-fadeIn flex items-start gap-[12px] border-b border-[#F7F7F7] py-[16px] last:border-b-0">
      <Avatar className="h-[40px] w-[40px] shrink-0">
        <AvatarImage src={comment.author.profileImageUrl} />
        <AvatarFallback className="bg-[#F5ECFF] text-[14px] font-semibold text-[#6B21A8]">
          {comment.author.nickname[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              title="댓글 수정"
              placeholder="댓글을 수정해주세요."
              value={editingContent}
              onChange={(e) => onEditingContentChange(e.target.value)}
              className="min-h-[80px] w-full resize-none rounded-[8px] border border-[#E4E4E4] px-[12px] py-[8px] text-[13px] focus:border-[#6201E0] focus:outline-none"
              disabled={isUpdating}
            />
            <div className="flex gap-[8px]">
              <button
                onClick={onSaveEdit}
                disabled={isUpdating || !editingContent.trim()}
                className="rounded-[6px] bg-[#6201E0] px-[12px] py-[6px] text-[12px] text-white hover:bg-[#5201C0] disabled:bg-[#E0E0E0]"
              >
                {isUpdating ? '저장 중...' : '저장'}
              </button>
              <button
                onClick={onCancelEdit}
                disabled={isUpdating}
                className="rounded-[6px] border border-[#E4E4E4] px-[12px] py-[6px] text-[12px] text-[#707070] hover:bg-[#F7F7F7]"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-[6px] flex items-center gap-[8px]">
              <span className="text-[13px] font-semibold text-[#121212]">
                {comment.author.nickname}
              </span>
              <span className="text-[11px] text-[#BDBDBD]">
                {comment.createdAt}
              </span>
              {variant === 'author' && (
                <>
                  <button
                    type="button"
                    onClick={() => onEdit(comment)}
                    className="text-[11px] text-[#BDBDBD] hover:text-[#6201E0] hover:underline"
                    disabled={isDeleting || isUpdating}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(comment.id)}
                    className="text-[11px] text-[#BDBDBD] hover:text-[#6201E0] hover:underline"
                    disabled={isDeleting || isUpdating}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
            <p className="text-[13px] leading-[20px] text-[#4D4D4D]">
              {comment.content}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
