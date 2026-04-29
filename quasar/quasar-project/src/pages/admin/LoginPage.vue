<template>
  <q-page>
    <div class="flex flex-center absolute-full text-subtitle2">
      <q-card class="my-card q-px-md p-py-md" style="background-color: rgba(255, 255, 255, 0.7)">
        <div class="flex flex-center">
          <q-icon name="account_circle" color="grey-6" size="4rem" />
        </div>
        <q-card-section>
          <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <div>
              <q-input v-model="userName" type="text" label="userName" />
            </div>
            <div>
              <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Password">
                <template v-slot:append>
                  <q-icon
                    @click="togglePwdVisibility"
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                  />
                </template>
              </q-input>
            </div>
            <div>
              <q-btn label="Login" no-caps type="submit" color="primary" style="width: 100%" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import type { AxiosError } from 'axios';
const $q = useQuasar();
const router = useRouter();

const userName = ref('');
const password = ref('');
const isPwd = ref(true);

const togglePwdVisibility = () => {
  isPwd.value = !isPwd.value;
};

const onSubmit = async () => {
  try {
    const response = await api.post(`/auth/login`, {
      userName: userName.value,
      password: password.value,
    });
    console.log(response);
    const accessToken = response.data.user.user.accessToken;
    const refreshToken = response.data.user.user.refreshToken;
    const userId = response.data.user.user.uId;
    const firstName = response.data.user.user.firstName;
    const username = response.data.user.user.userName;

    localStorage.setItem('accessToken', accessToken);

    localStorage.setItem('refreshToken', refreshToken);

    localStorage.setItem('userId', userId);

    localStorage.setItem('firstName', firstName);

    localStorage.setItem(' username', username);
    if (response.status === 201) {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: response.data.message,
      });
      router.push('/admin/festival').catch((err) => console.error(err));
    }
  } catch (err: unknown) {
    // $q.notify({ color: 'red-5', textColor: 'white', icon: 'warning', message: 'Login failed' });
    // console.error(error);
    const error = err as AxiosError<{ message: string }>; // Casting ประเภทข้อมูล
    const errorResponse = error.response;

    if (errorResponse && errorResponse.status === 404) {
      $q.notify({
        color: 'negative',
        message: errorResponse.data?.message,
        icon: 'error',
      });
    } else {
      $q.notify({
        color: 'negative',
        message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
        icon: 'error',
      });
    }
    console.error('Post Sender Error:', error);
  }
};
</script>
