export interface Friend {
    public_id: string;
    img_src: string;
    name: string;
}

export interface FriendRequest {
    public_id: string;
    from_user: Friend;
    to_user: Friend;
    status: "pending" | "accepted" | "rejected";
    created_at: string;
}