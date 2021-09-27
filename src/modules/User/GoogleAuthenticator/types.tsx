export type Payload = {
  phoneType?: string;
  code?: string;
  executed?: boolean;
};

export type ComponentProps = {
  payload: Payload | undefined;
  handleChange(payload: Payload, currentStep: number): void;
};

export type OtpToken = {
  otpKey: string;
}

export type OtpTokenValidate = {
  result: boolean;
}