import { Pipe, PipeTransform } from '@angular/core';
import { IRoomEventInfo, Message } from '../room.component';

@Pipe({
  name: 'showSenderIcon',
})
export class ShowSenderIconPipe implements PipeTransform {
  transform(
    i: number,
    msgEvent: Message,
    currentSocketId: string,
    roomEvents: IRoomEventInfo[]
  ): boolean {
    const messageIsNotFromUser = msgEvent.senderId !== currentSocketId;
    const isLastEvent = !roomEvents[i + 1];
    const nextEventIsNotMessage = roomEvents[i + 1]?.type !== 'message';
    const nextEventIsNotMessageFromSameSender =
      msgEvent.senderId !== (roomEvents[i + 1]?.data as Message)?.senderId;
    return (
      messageIsNotFromUser &&
      (isLastEvent ||
        nextEventIsNotMessage ||
        nextEventIsNotMessageFromSameSender)
    );
  }
}
