import {
  Injectable,
  // ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
// import { I18nService } from "nestjs-i18n";
import { MESSAGE } from 'src/common/message';

@Injectable()
export class ExceptionsService {
  //   constructor(private readonly i18n: I18nService) {}

  // Sender exceptions
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
  // throwFestivalConflict(): never {
  //   throw new ConflictException(MESSAGE.FESTIVAL.FESTIVAL_CONFLICT);
  // }
  throwCardNotFound(): never {
    throw new NotFoundException(MESSAGE.CARD.NOT_FOUND);
  }

  throwFestivalNotFound(): never {
    throw new NotFoundException(MESSAGE.FESTIVAL.NOT_FOUND);
  }

  throwDateNotService(): never {
    throw new ForbiddenException(MESSAGE.SENDER.NOT_SERVICE);
  }

  throwRoleForbidden(): never {
    throw new ForbiddenException(MESSAGE.AUTH.ROLE_NOT_ACCESS);
  }

  throwAdminNotFound(): never {
    throw new NotFoundException(MESSAGE.ADMIN.NOT_FOUND);
  }

  throwFestivalEditDeleteForbidden(): never {
    throw new ForbiddenException(MESSAGE.FESTIVAL.NOT_EDIT_DELETE);
  }

  throwFirstNameAlreadyExits(): never {
    throw new ConflictException(MESSAGE.ADMIN.FIRSTNAME_CONFLICT);
  }

  throwUserNameAlreadyExits(): never {
    throw new ConflictException(MESSAGE.ADMIN.USERNAME_CONFLICT);
  }

  throwEmailAlreadyExits(): never {
    throw new ConflictException(MESSAGE.ADMIN.EMAIL_CONFLICT);
  }

  throwBadWordAlreadyExits(): never {
    throw new ConflictException(MESSAGE.UNPOLITE.WORD_CONFLICT);
  }
  throwPhoneNumberAlreadyExits(): never {
    throw new ConflictException(MESSAGE.ADMIN.PHONENUMBER_CONFLICT);
  }

  throwSuperAdminNotExceptedChange(): never {
    throw new ForbiddenException(MESSAGE.ADMIN.SUPER_ADMIN_NOT_EXCEPT);
  }

  throwFestivalNotExceptedChange(): never {
    throw new ForbiddenException(MESSAGE.FESTIVAL.FESTIVAL_NOT_EXCEPT);
  }

  
}
