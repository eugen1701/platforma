export interface MessageProps {
    createdAt:{seconds:number; nanoseconds:number};
    from:string;
    text:string;
    to:string;
    media?:string;
}