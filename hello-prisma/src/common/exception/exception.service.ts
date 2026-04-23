import {
  Injectable,
  //   ConflictException,
  //   UnauthorizedException,
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
  throwBadWordFound(): never {
    throw new BadRequestException(MESSAGE.SENDER.BAD_WORD_FOUND);
  }

  //   throwUserAlreadyExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.emailExists"));
  //   }

  //   throwEmailExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.emailExists"));
  //   }

  //   throwPhoneExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.phoneExists"));
  //   }

  //   throwNationalIdExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.nationalIdExists"));
  //   }

  //   throwChassisNumberExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.chassisNumberExists"));
  //   }

  //   throwChassisNumberInvalid(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.chassisNumberInvalid"));
  //   }

  //   throwChassisVerificationFailed(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.chassisVerificationFailed"));
  //   }

  //   throwBookingFailed(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.bookingFailed"));
  //   }

  //   throwBookingAlreadyCancelled(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.bookingAlreadyCancelled"));
  //   }

  //   throwCannotCancelPastBooking(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.cannotCancelPastBooking"));
  //   }

  //   throwBookingCancelFailed(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.bookingCancelFailed"));
  //   }

  //   throwServiceHistoryFetchFailed(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.serviceHistoryFetchFailed"));
  //   }

  //   throwNoBayAvailable(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.noBayAvailable"));
  //   }

  //   // Authentication exceptions
  //   throwPhoneLoginOnlyForCarOwner(): never {
  //     throw new ForbiddenException(this.i18n.translate("common.messages.phoneLoginOnlyForCarOwner"));
  //   }

  //   throwEmailPasswordRequired(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.emailPasswordRequired"));
  //   }

  //   throwUserHasNoPassword(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.userHasNoPassword"));
  //   }

  //   throwInvalidCredentials(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.invalidCredentials"));
  //   }

  //   throwInvalidRefreshToken(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.invalidRefreshToken"));
  //   }

  //   throwUnauthorizedAccess(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.unauthorized"));
  //   }

  //   throwInsufficientPermissions(): never {
  //     throw new ForbiddenException(this.i18n.translate("common.messages.insufficientPermissions"));
  //   }

  //   throwTokenRequired(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.tokenRequired"));
  //   }

  //   throwInvalidToken(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.invalidToken"));
  //   }

  //   throwInvalidOtp(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.invalidOtp"));
  //   }

  //   throwOtpExpired(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.otpExpired"));
  //   }

  //   throwMobileSessionExpired(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.mobileSessionExpired"));
  //   }

  //   throwInvalidTempToken(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.invalidTempToken"));
  //   }

  //   throwTempUserNotFound(): never {
  //     throw new NotFoundException(this.i18n.translate("common.messages.tempUserNotFound"));
  //   }

  //   throwInvalidRegistrationStep(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.invalidRegistrationStep"));
  //   }

  //   throwIncompletedRegistration(): never {
  //     throw new UnauthorizedException(this.i18n.translate("common.messages.incompletedRegistration"));
  //   }

  //   // Password-related exceptions
  //   throwPasswordMismatch(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.passwordMismatch"));
  //   }

  //   throwInvalidOldPassword(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.invalidOldPassword"));
  //   }

  //   throwNewPasswordSameAsOld(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.newPasswordSameAsOld"));
  //   }

  //   throwPasswordsDoNotMatch(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.passwordsDoNotMatch"));
  //   }

  //   // Terms-related exceptions
  //   throwTermsNotFound(): never {
  //     throw new NotFoundException(this.i18n.translate("common.messages.termNotFound"));
  //   }

  //   throwTermsAlreadyExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.termsAlreadyExists"));
  //   }

  //   // General exceptions
  //   throwNotFound(): never {
  //     throw new NotFoundException(this.i18n.translate("common.messages.notFound"));
  //   }

  //   // General validation exceptions
  //   throwInvalidInput(field: string): never {
  //     throw new BadRequestException(
  //       this.i18n.translate("common.messages.invalidInput", { args: { field } }),
  //     );
  //   }

  //   throwDuplicateEntry(resource: string): never {
  //     throw new ConflictException(
  //       this.i18n.translate("common.messages.duplicateEntry", { args: { resource } }),
  //     );
  //   }

  //   throwResourceNotFound(resource: string): never {
  //     throw new NotFoundException(
  //       this.i18n.translate("common.messages.resourceNotFound", { args: { resource } }),
  //     );
  //   }

  //   // Package-specific exceptions
  //   throwPackageNameExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.packageNameExists"));
  //   }

  //   throwPopularPackageExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.popularPackageExists"));
  //   }

  //   // Robot-specific exceptions
  //   throwRobotNotFound(): never {
  //     throw new NotFoundException(this.i18n.translate("common.messages.robotNotFound"));
  //   }

  //   throwRobotCodeAlreadyExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.robotCodeExists"));
  //   }

  //   //model exceptions
  //   throwModelNameExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.modelName"));
  //   }

  //   //Code exceptions
  //   throwCodeExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.code"));
  //   }

  //   // Building-specific exceptions
  //   throwBuildingNotFound(): never {
  //     throw new NotFoundException(this.i18n.translate("common.messages.buildingNotFound"));
  //   }

  //   throwBuildingNameExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.buildingNameExists"));
  //   }

  //   throwBuildingCodeExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.buildingCodeExists"));
  //   }
  //   //CreatedBy Exceptions
  //   throwCreatedByNotMatches(): never {
  //     throw new NotFoundException(this.i18n.translate("common.messages.createdNotMatches"));
  //   }

  //   // Floor-specific exceptions
  //   throwFloorNotFound(): never {
  //     throw new NotFoundException(this.i18n.translate("common.messages.floorNotFound"));
  //   }

  //   throwFloorNumberExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.floorNumberExists"));
  //   }

  //   // Room-specific exceptions
  //   throwRoomNotFound(): never {
  //     throw new NotFoundException(this.i18n.translate("common.messages.roomNotFound"));
  //   }

  //   throwRoomNumberExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.roomNumberExists"));
  //   }

  //   // IoT-specific exceptions
  //   throwInvalidCode(): never {
  //     throw new BadRequestException(this.i18n.translate("iot.messages.invalidCode"));
  //   }

  //   throwCodeAlreadyUsed(): never {
  //     throw new BadRequestException(this.i18n.translate("iot.messages.codeAlreadyUsed"));
  //   }

  //   throwRiderCodeRequired(): never {
  //     throw new BadRequestException(this.i18n.translate("iot.messages.riderCodeRequired"));
  //   }

  //   throwRobotNotActive(): never {
  //     throw new BadRequestException(this.i18n.translate("iot.messages.robotNotActive"));
  //   }

  //   //Check Point
  //   throwPointLess(): never {
  //     throw new BadRequestException(this.i18n.translate("common.messages.pointLess"));
  //   }

  //   // redeem Exits
  //   throwRedeemExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.redeemExists"));
  //   }

  //   // redeem Exits
  //   throwDealerExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.DealerExists"));
  //   }

  //   // count user Exits
  //   throwDeleteGroupNotExists(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.deleteNotExists"));
  //   }
  //   // Survey exceptions
  //   throwSurveyHasResponses(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.surveyHasResponses"));
  //   }

  //   // Daily Login exceptions
  //   throwDailyLoginAlreadyClaimed(): never {
  //     throw new ConflictException(this.i18n.translate("common.messages.dailyLoginAlreadyClaimed"));
  //   }
}
