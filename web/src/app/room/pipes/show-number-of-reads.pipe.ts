import { Pipe, PipeTransform } from '@angular/core';
import { IRoomEventInfo, Message } from '../room.component';

@Pipe({
  name: 'showNumberOfReads',
  pure: false,
})
export class ShowNumberOfReadsPipe implements PipeTransform {
  transform(
    i: number,
    msgEvent: Message,
    currentSocketId: string,
    roomEvents: IRoomEventInfo[]
  ): boolean {
    const messageIsFromUser = msgEvent?.senderId === currentSocketId;
    const nextMessagesFromCurrentUser = roomEvents
      .slice(i + 1)
      .find(
        (ev) => ev.type === 'message' && ev.data?.senderId === currentSocketId
      );

    const messageHasAtLeastOneRead = msgEvent?.readBy?.length > 0;
    return (
      messageIsFromUser &&
      !nextMessagesFromCurrentUser &&
      messageHasAtLeastOneRead
    );
  }
}
