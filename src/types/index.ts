export interface WaitlistSuccess {
  success: true;
  alreadySignedUp: boolean;
}

export interface WaitlistFailure {
  error: "INVALID_EMAIL" | "SERVER_ERROR";
  message: string;
}

export type WaitlistResponse = WaitlistSuccess | WaitlistFailure;
