import { PostsDto } from '../Posts';
import { CommentsDto } from '../Comments';
import { MessagesDto } from '../Messages';
import { GroupChatsDto } from '../GroupChats';
import { GroupChatUsersDto } from '../GroupChatUsers';
import { UserNotificationsDto } from '../UserNotifications';
import { ReportUserRequestsDto } from '../ReportUserRequests';
import { PostLikesDto } from '../PostLikes';
import { FriendRequestsDto } from '../FriendRequests';
import { FriendsDto } from '../Friends';
import { Role, UserStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class UsersEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  code: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  birthDate: Date | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  course: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  password: string | null;
  @ApiProperty({
    enum: Role,
    enumName: 'Role',
  })
  role: Role;
  @ApiProperty({
    enum: UserStatus,
    enumName: 'UserStatus',
  })
  status: UserStatus;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  urlAvatar: string | null;
  @ApiProperty({
    type: () => PostsDto,
    isArray: true,
    required: false,
  })
  posts?: PostsDto[];
  @ApiProperty({
    type: () => CommentsDto,
    isArray: true,
    required: false,
  })
  comments?: CommentsDto[];
  @ApiProperty({
    type: () => MessagesDto,
    isArray: true,
    required: false,
  })
  messages?: MessagesDto[];
  @ApiProperty({
    type: () => GroupChatsDto,
    isArray: true,
    required: false,
  })
  groupChats?: GroupChatsDto[];
  @ApiProperty({
    type: () => GroupChatUsersDto,
    isArray: true,
    required: false,
  })
  groupChatUsers?: GroupChatUsersDto[];
  @ApiProperty({
    type: () => UserNotificationsDto,
    isArray: true,
    required: false,
  })
  userNotifications?: UserNotificationsDto[];
  @ApiProperty({
    type: () => ReportUserRequestsDto,
    isArray: true,
    required: false,
  })
  reportUserRequests?: ReportUserRequestsDto[];
  @ApiProperty({
    type: () => PostLikesDto,
    isArray: true,
    required: false,
  })
  postLikes?: PostLikesDto[];
  @ApiProperty({
    type: () => FriendRequestsDto,
    isArray: true,
    required: false,
  })
  friendRequestsSent?: FriendRequestsDto[];
  @ApiProperty({
    type: () => FriendRequestsDto,
    isArray: true,
    required: false,
  })
  friendRequestsReceived?: FriendRequestsDto[];
  @ApiProperty({
    type: () => FriendsDto,
    isArray: true,
    required: false,
  })
  friendsAsUser?: FriendsDto[];
  @ApiProperty({
    type: () => FriendsDto,
    isArray: true,
    required: false,
  })
  friendsAsFriend?: FriendsDto[];
}
