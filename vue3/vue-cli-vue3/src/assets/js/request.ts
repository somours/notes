import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios'
import {reactive, Ref, onMounted, ComputedRef, toRefs } from 'vue'

// 接口请求响应数据
interface RequestResponse<T> {
  code: number,
  data: T,
  errMsg: string
}

// 定义接口请求配置
interface RequestConfig<T> extends AxiosRequestConfig {
  initialData?: T;
  immediate: boolean;
  onSuccess?: (data: RequestResponse<T>) => void;
  onFail?: (data: RequestResponse<T>) => void;
}

// 请求参数定义
interface RequestParams {
  [propName: string]: unknown
}

// 请求的一些状态
interface RequestState<T> {
  loading: boolean;
  error: boolean;
  data: T;
}

// useRequest的返回数据
interface ReturnResult<T> {
  loading: Ref<boolean>;
  error: Ref<boolean>;
  data: Ref<T>;
  fetch: () => Promise<void>;
}

const defaultConfig = {
  immediate: true
}

// useRequest函数的定义
function useRequest<T>(
  url: string | ComputedRef<string>,
  config?: Partial<RequestConfig<T>>
) : ReturnResult<T>

function useRequest<T>(
  url: string | ComputedRef<string>,
  params?: ComputedRef<RequestParams>,
  config?: Partial<RequestConfig<T>>
): ReturnResult<T>

function useRequest<T>(...args: any[]): ReturnResult<T> {
  let _url: {value: string};
  let _params: ComputedRef<RequestParams> | undefined;
  let _config: Partial<RequestConfig<T>> = {};
  if(args.length >= 1) {
    _url = args[0].value ? args[0] : {value: args[0]};
  }
  if(args.length > 2) {
    _params = args[1];
    _config = args[2];
  } else {
    if(args[1] && args[1].value) {
      _params = args[1];
    } else if (typeof args[1] === 'object') {
      _config = args[1]
    }
  }

  const combineConfig: RequestConfig<T> = {...defaultConfig, ..._config};

  const {initialData, immediate, onSuccess, onFail, ...axiosConfig} = combineConfig;

  const state: RequestState<T> = reactive({
    loading: false,
    error: false,
    data: initialData
  }) as RequestState<T>

  // 请求函数
  const fetchFunc = () => {
    state.loading = true;
    const matched = _url.value.match(/:(\S+)/);
    const method: Method = matched ? (matched[1] as Method) : 'get';
    const isGetMethod = method.toLowerCase() === 'get';

    return axios({
      url: _url.value,
      method,
      params: isGetMethod ? _params?.value : undefined,
      data: isGetMethod ? undefined : _params?.value,
      ...axiosConfig
    }).then((response: AxiosResponse<RequestResponse<T>>) => {
      const result = response.data;
      if(result.code === 200) {
        state.data = result.data;
        if(typeof onSuccess === 'function') {
          onSuccess(result)
        }
      } else {
        if(typeof onFail === 'function') {
          onFail(result)
        }
      }
      state.loading = false;
    }).catch(() => {
      state.loading = false;
      state.error = true
    })
  }

  onMounted(() => {
    if(immediate) {
      fetchFunc()
    }
  })
  return { ...toRefs(state), fetch: fetchFunc } as ReturnResult<T>;
}

export {
  useRequest
};

const instance = axios.create({
  timeout: 6000,
  baseURL: '/'
})

// instance.interceptors.response.use(
//   res => res.data,
//   () => {
//     // message error
//   }
// )

export default instance;
