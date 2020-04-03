import { EWebinar } from '@src/fromBackend/schema';
import { RoomType } from '@src/fromBackend/schema';

export interface EwebinarRoom {
  title: string;
  duration: number;
  appearAt: number;
  type: RoomType;
}

export default class Rooms extends Array<EwebinarRoom> {
  constructor(...rooms: Array<EwebinarRoom>) {
    super();
    this.push(...rooms);
  }
  static create(ewebinar: EWebinar): Rooms {
    const rooms: Partial<EwebinarRoom>[] = [
      {
        title: 'Waiting',
        type: RoomType.Waiting,
        duration: ewebinar.waitingRoomDurationSecs,
      },
      {
        title: 'Presentation',
        type: RoomType.Presentation,
        duration: ewebinar.duration || 0,
      },
      {
        title: 'Exit',
        type: RoomType.Exit,
        duration: ewebinar.exitRoomDurationSecs,
      },
    ];

    const roomsWithAppearAt = Rooms.withAppearAt(rooms);
    return new Rooms(...roomsWithAppearAt);
  }

  // Calculate `appearAt` for each room based on specified `duration`
  static withAppearAt(rooms: Partial<EwebinarRoom>[]): Rooms {
    const waitingRoom = rooms[0];
    const offset = 0 - (waitingRoom.duration || 0);
    const roomsWithAppearAt = rooms.reduce<EwebinarRoom[]>((acc: any, room: any, index: number) => {
      const prevRoom = acc[index - 1];
      return acc.concat({
        ...room,
        appearAt: (prevRoom ? prevRoom.duration : 0) + (prevRoom ? prevRoom.appearAt : offset),
      });
    }, []);
    return new Rooms(...roomsWithAppearAt);
  }

  // Calculate total duration
  public get domain(): [number, number] {
    return [0 - this.offset, this.maxDuration];
  }

  // Offset timeline numbers
  public get offset() {
    return this[0].duration;
  }
  // Calculate total duration
  public get maxDuration() {
    return this.reduce((acc: number, room: EwebinarRoom) => acc + room.duration, 0) - this.offset;
  }

  // Find EwebinarRoom based on `type` property
  public getRoom(type: RoomType): EwebinarRoom | undefined {
    return this.find((room) => {
      return room.type === type;
    });
  }

  // Finds EwebinarRoom based on `playbackPosition`
  public getRoomAt(playbackPosition: number): EwebinarRoom | undefined {
    return this.sort((a: EwebinarRoom, b: EwebinarRoom) => a.appearAt - b.appearAt).reduce<any>(
      (res, room, currentIndex) => {
        const a = this[currentIndex];
        const b = this[currentIndex + 1];

        if (playbackPosition >= a.appearAt! && (b ? playbackPosition < b.appearAt! : true)) {
          return room;
        } else {
          return res;
        }
      },
      undefined
    );
  }
}
