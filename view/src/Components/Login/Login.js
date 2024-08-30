import React from "react";

export default function Login() {
    return(
        <div class="col-6">
            <form>
                <input type="email" name="email"></input>
                <input type="password" name="password"></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}