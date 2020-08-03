import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navigation = () => (
    <div>
        <Link to="/dashboard">
            <h1>
                Kanban Board
            </h1>
        </Link>
    </div>
);

export const ConnectedNavigation = connect(state => state)(Navigation)
