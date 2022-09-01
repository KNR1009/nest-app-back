// レスポンスメッセージの型
export type Msg = {
  message: string;
};

// セキュリティー対策のcsrfトークン用の型
export type Csrf = {
  csrfToken: string;
};

// jwtトークン用の型定義
export type Jwt = {
  accessToken: string;
};
