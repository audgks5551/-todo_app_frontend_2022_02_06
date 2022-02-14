import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {

    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method
    };

    
    console.log(options);
    if (request) {
        options.body = JSON.stringify(request);
    }

    // fetch(url, {header, url, method, body})하면 reponse생성 => json화 => 
    // promise는 자바스크립트 비동기 처리에 사용되는 객체
    // promise.rejected(거부) : 처리가 실패로 끝난 상태
    // then 메소드는 해당 Promise 가 성공했을 때의 동작을 지정합니다. 인자로 함수를 받습니다.
    // catch 메소드는 해당 Promise 가 실패했을 때의 동작을 지정합니다. 인자로 함수를 받습니다.
    return fetch(options.url, options)
        .then( (response) =>
            response.json().then( (json) => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch( (error) => {
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = "/login";
            }

            return Promise.reject(error)
        })
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem("ACCESS_TOKEN", response.token);

            window.location.href="/";
        });
}