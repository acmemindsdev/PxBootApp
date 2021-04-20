declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.jpeg" {
    const src: string;
    export default src;
}

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.ttf" {
    const src: string;
    export default src;
}

declare module "emoji-utils" {
    const isPureEmojiString = (str: string):boolean => {};
    export const isPureEmojiString;
}
