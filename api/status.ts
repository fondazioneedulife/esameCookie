/**
 * WAIT: show waiting message
 * PLAY: user can extract recipient
 * DONE: show associated recipient
 */
export type Status = "WAIT" | "PLAY" | "DONE";

export type StatusPayload = {
  status: Status;
};
