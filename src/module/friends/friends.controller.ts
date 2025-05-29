import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator';
import {
  CreateFriendRequestsDto,
  PayloadJwtDto,
  PaginationDto,
  FriendRequestsEntity,
  ResMessage,
  FriendsEntity,
  UsersEntity,
} from '@types';
import { User } from '@app/common/decorators/user.decorator';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt.guard';
import { SearchFriendDto } from './dto/getFriend.dto';

@ApiTags('friends')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('sent')
  @ApiSwagger({
    summary: 'Gửi lời mời kết bạn',
    response: {
      type: FriendRequestsEntity,
    },
  })
  createRequest(
    @User() { id }: PayloadJwtDto,
    @Body() createFriendRequestDto: CreateFriendRequestsDto,
  ) {
    return this.friendsService.createRequest(id, createFriendRequestDto);
  }

  @Get('sent')
  @ApiSwagger({
    summary: 'Lấy danh sách lời kết bạn đã gửi',
    response: {
      type: FriendRequestsEntity,
      isArray: true,
    },
  })
  getSentRequests(
    @User() { id }: PayloadJwtDto,
    @Query() query: PaginationDto,
  ) {
    return this.friendsService.getSentRequests(id, query);
  }

  @Get('received')
  @ApiSwagger({
    summary: 'Lấy danh sách lời kết bạn đã nhận',
    response: {
      type: FriendRequestsEntity,
      isArray: true,
    },
  })
  getReceivedRequests(
    @User() { id }: PayloadJwtDto,
    @Query() query: PaginationDto,
  ) {
    return this.friendsService.getReceivedRequests(id, query);
  }

  @Post('received/:requestId')
  @ApiSwagger({
    summary: 'Đồng ý kết bạn',
    param: ['requestId'],
    response: {
      type: ResMessage,
    },
  })
  confirmFriendRequest(
    @User() { id }: PayloadJwtDto,
    @Param('requestId') requestId: string,
  ) {
    return this.friendsService.confirmFriendRequest(id, requestId);
  }

  @Get('friends')
  @ApiSwagger({
    summary: 'Lấy danh sách bạn bè',
    response: {
      type: UsersEntity,
      isArray: true,
    },
  })
  getFriends(@User() { id }: PayloadJwtDto, @Query() query: SearchFriendDto) {
    return this.friendsService.getFriends(id, query);
  }

  @Get('nonFriends')
  @ApiSwagger({
    summary: 'Lấy danh sách những người chưa kết bạn',
    response: {
      type: UsersEntity,
      isArray: true,
    },
  })
  getNonFriendUsers(
    @User() { id }: PayloadJwtDto,
    @Query() query: SearchFriendDto,
  ) {
    return this.friendsService.getNonFriendUsers(id, query);
  }

  @Delete(':friendId')
  @ApiSwagger({
    summary: 'Xóa bạn bè',
    param: ['friendId'],
    response: {
      type: ResMessage,
    },
  })
  removeFriend(
    @User() { id }: PayloadJwtDto,
    @Param('friendId') friendId: string,
  ) {
    return this.friendsService.removeFriend(id, friendId);
  }

  @Delete('received/:requestId')
  @ApiSwagger({
    summary: 'Không đồng ý kết bạn',
    param: ['requestId'],
    response: {
      type: ResMessage,
    },
  })
  cancelFriendRequest(
    @User() { id }: PayloadJwtDto,
    @Param('requestId') requestId: string,
  ) {
    return this.friendsService.cancelFriendRequest(id, requestId);
  }
}
