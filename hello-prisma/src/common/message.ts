export const MESSAGE = {
  FESTIVAL: {
    GET_SUCCESS: 'ดึงข้อมูลเทศกาลสำเร็จ',
    GET_FAIL: 'ดึงข้อมูลเทศกาลไม่สำเร็จ',
    CREATE_SUCCESS: 'สร้างเทศกาลสำเร็จ',
    UPDATE_SUCCESS: 'แก้ไขขื่อเทศกาลสำเร็จ',
    INVALID_FESTIVALID: 'ไม่มีเทศกาลนี้ในระบบ',
    DELETE_SUCCESS: 'ลบข้อมูลเทศกาลสำเร็จ',
    // FESTIVAL_CONFLICT: 'มีข้อมูลเทศกาลแล้ว',
  },
  SENDER: {
    CREATE_SUCCESS: 'สร้างผู้ส่งคำอวยพรสำเร็จ',
    CREATE_FAIL: 'สร้างผู้ส่งคำอวยพรไม่สำเร็จ',
    GET_SUCCESS: 'แสดงรายการข้อมูลผู้ส่งคำอวยพรสำเร็จ',
    NOT_FOUND: 'ไม่พบผู้ส่งคำอวยพร',
    BAD_WORD_FOUND: 'ไม่บันทึกคำไม่สุภาพ',
  },
  UNPOLITE: {
    CREATE_SUCCESS: 'สร้างคำไม่สุภาพสำเร็จ',
    GET_SUCCESS: 'แสดงรายการข้อมูลคำไม่สุภาพสำเร็จ',
    NOT_FOUND: 'ไม่พบคำไม่สุภาพคำนี้',
    DELETE_SUCCESS: 'ลบคำไม่สุภาพสำเร็จ',
    UPDATE_SUCCESS: 'แก้ไขคำไม่สุภาพสำเร็จ',
  },
  AUTH: {
    INVALID_USERNAME: 'ไม่มีชื่อผู้ใช้นี้ในระบบ',
    INVALID_PASSWORD: 'รหัสผ่านไม่ถูกต้อง',
    INVALID_RENEW_TOKEN: 'รีนิวโทเค็นไม่ถูกต้อง',
    LOGIN_SUCCESS: 'เข้าสู่ระบบสำเร็จ',
    RENEW_TOKEN_SUCCESS: 'รีนิวโทเค็นสำเร็จ',
  },
  WISH: {
    CREATE_SUCCESS: 'สร้างคำอวยพรสำเร็จ',
    GET_SUCCESS: 'แสดงรายการข้อมูลคำอวยพรสำเร็จ',
    NOT_FOUND: 'ไม่พบคำอวยพร',
    UPDATE_SUCCESS: 'แก้ไขคำอวยพรสำเร็จแล้ว',
    DELETE_SUCCESS: 'ลบคำอวยพรสำเร็จ',
  },
  CARD: {
    CREATE_SUCCESS: 'สร้างรูปภาพอวยพรสำเร็จ',
    GET_SUCCESS: 'แสดงรายการรูปภาพอวยพรสำเร็จ',
    UPDATE_SUCCES: 'แก้ไขรูปภาพอวยพรสำเร็จ',
    DELETE_SUCCESS: 'ลบรูปภาพอวยพรสำเร็จ',
    NOT_FOUND: 'ไม่พบรูปภาพอวยพร',
  },
  VALIDATE: {
    FILE_EMPTY: 'ไม่พบไฟล์ที่ส่ง',
    FILE_DOUBLE_NAME: 'นามสกุลไฟล์ซ้อน',
    // FILE_S
  },
};
