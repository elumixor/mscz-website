export type Review = { content: string } & (
    | {
          anonymous: false;
          id: string;
          name: string;
      }
    | {
          anonymous: true;
      }
);
