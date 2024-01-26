import { IResponse } from "../utils/transform.response"

export {}

declare global {

    type PResponse<T> = Promise<IResponse<T>>
}