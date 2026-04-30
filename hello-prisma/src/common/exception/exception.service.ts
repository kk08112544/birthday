import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  //   ForbiddenException,
} from '@nestjs/common';
// import { I18nService } from "nestjs-i18n";
import { MESSAGE } from 'src/common/message';

@Injectable()
export class ExceptionsService {
  //   constructor(private readonly i18n: I18nService) {}

  // User-related exceptions
  throwSenderNotFound(): never {
    throw new NotFoundException(MESSAGE.SENDER.NOT_FOUND);
  }
  throwFoundBadWord(): never {
    throw new BadRequestException(MESSAGE.SENDER.BAD_WORD_FOUND);
  }

  throwBadWordNotFound(): never {
    throw new NotFoundException(MESSAGE.UNPOLITE.NOT_FOUND);
  }
  throwInvalidUserName(): never {
    throw new NotFoundException(MESSAGE.AUTH.INVALID_USERNAME);
  }
  throwInvalidPassword(): never {
    throw new NotFoundException(MESSAGE.AUTH.INVALID_PASSWORD);
  }
  throwInvalidRenewToken(): never {
    throw new UnauthorizedException(MESSAGE.AUTH.INVALID_RENEW_TOKEN);
  }
  throwInvalidFestival(): never {
    throw new NotFoundException(MESSAGE.FESTIVAL.INVALID_FESTIVALID);
  }
  throwWisherNotFound(): never {
    throw new NotFoundException(MESSAGE.WISH.NOT_FOUND);
  }
  throwFestivalConflict(): never {
    throw new ConflictException(MESSAGE.FESTIVAL.FESTIVAL_CONFLICT);
  }
  throwCardNotFound(): never {
    throw new NotFoundException(MESSAGE.CARD.NOT_FOUND);
  }
}
