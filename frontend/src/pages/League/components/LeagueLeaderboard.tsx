import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LeagueLeaderboardEntry } from "../../../types/leagueStatistics";
import "./LeagueLeaderboard.css";

interface Props {
leaderboard: LeagueLeaderboardEntry[];
}

type LeaderboardView =
| "wins"
| "average_finish"
| "win_rate"
| "record"
| "games_played";

const MINIMUM_GAMES_FOR_WIN_RATE = 5;

export default function LeagueLeaderboard({
leaderboard,
}: Props) {
const navigate = useNavigate();


const [view, setView] =
    useState<LeaderboardView>("wins");

function getRankDisplay(rank: number): string {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";

    return `#${rank}`;
}

function compareByWins(
    a: LeagueLeaderboardEntry,
    b: LeagueLeaderboardEntry
): number {
    return (
        b.wins - a.wins ||
        b.win_rate - a.win_rate ||
        b.games_played - a.games_played
    );
}

function compareByAverageFinish(
    a: LeagueLeaderboardEntry,
    b: LeagueLeaderboardEntry
): number {
    if (a.games_played === 0 && b.games_played === 0) {
        return 0;
    }

    if (a.games_played === 0) {
        return 1;
    }

    if (b.games_played === 0) {
        return -1;
    }

    return (
        a.average_finish - b.average_finish ||
        compareByWins(a, b)
    );
}

function compareByWinRate(
    a: LeagueLeaderboardEntry,
    b: LeagueLeaderboardEntry
): number {
    const aQualified =
        a.games_played >= MINIMUM_GAMES_FOR_WIN_RATE;

    const bQualified =
        b.games_played >= MINIMUM_GAMES_FOR_WIN_RATE;

    if (aQualified !== bQualified) {
        return aQualified ? -1 : 1;
    }

    return (
        b.win_rate - a.win_rate ||
        b.wins - a.wins ||
        b.games_played - a.games_played
    );
}

function compareByRecord(
    a: LeagueLeaderboardEntry,
    b: LeagueLeaderboardEntry
): number {
    return (
        b.win_rate - a.win_rate ||
        b.wins - a.wins ||
        b.games_played - a.games_played
    );
}

function compareByGamesPlayed(
    a: LeagueLeaderboardEntry,
    b: LeagueLeaderboardEntry
): number {
    return (
        b.games_played - a.games_played ||
        compareByWins(a, b)
    );
}

function getSortedLeaderboard(): LeagueLeaderboardEntry[] {
    const sorted = [...leaderboard];

    switch (view) {
        case "average_finish":
            return sorted.sort(compareByAverageFinish);

        case "win_rate":
            return sorted.sort(compareByWinRate);

        case "record":
            return sorted.sort(compareByRecord);

        case "games_played":
            return sorted.sort(compareByGamesPlayed);

        case "wins":
        default:
            return sorted.sort(compareByWins);
    }
}

function formatAverageFinish(
    player: LeagueLeaderboardEntry
): string {
    if (player.games_played === 0) {
        return "—";
    }

    return player.average_finish.toFixed(2);
}

function renderDesktopHeaders() {
    switch (view) {
        case "average_finish":
            return (
                <>
                    <th className="leaderboard-stat-column">
                        Avg. Finish
                    </th>
                    <th className="leaderboard-stat-column">
                        Games
                    </th>
                    <th className="leaderboard-stat-column">
                        Wins
                    </th>
                </>
            );

        case "win_rate":
            return (
                <>
                    <th className="leaderboard-stat-column">
                        Win %
                    </th>
                    <th className="leaderboard-stat-column">
                        Wins
                    </th>
                    <th className="leaderboard-stat-column">
                        Games
                    </th>
                </>
            );

        case "record":
            return (
                <>
                    <th className="leaderboard-stat-column">
                        Record
                    </th>
                    <th className="leaderboard-stat-column">
                        Win %
                    </th>
                    <th className="leaderboard-stat-column">
                        Games
                    </th>
                </>
            );

        case "games_played":
            return (
                <>
                    <th className="leaderboard-stat-column">
                        Games
                    </th>
                    <th className="leaderboard-stat-column">
                        Wins
                    </th>
                    <th className="leaderboard-stat-column">
                        Win %
                    </th>
                </>
            );

        case "wins":
        default:
            return (
                <>
                    <th className="leaderboard-stat-column">
                        Wins
                    </th>
                    <th className="leaderboard-stat-column">
                        Games
                    </th>
                    <th className="leaderboard-stat-column">
                        Win %
                    </th>
                </>
            );
    }
}

function renderDesktopStats(
    player: LeagueLeaderboardEntry
) {
    switch (view) {
        case "average_finish":
            return (
                <>
                    <td className="leaderboard-stat-column">
                        {formatAverageFinish(player)}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.games_played}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.wins}
                    </td>
                </>
            );

        case "win_rate":
            return (
                <>
                    <td className="leaderboard-stat-column">
                        {player.games_played >=
                        MINIMUM_GAMES_FOR_WIN_RATE
                            ? `${player.win_rate}%`
                            : "—"}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.wins}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.games_played}
                    </td>
                </>
            );

        case "record":
            return (
                <>
                    <td className="leaderboard-stat-column">
                        {player.wins}-{player.losses}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.win_rate}%
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.games_played}
                    </td>
                </>
            );

        case "games_played":
            return (
                <>
                    <td className="leaderboard-stat-column">
                        {player.games_played}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.wins}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.win_rate}%
                    </td>
                </>
            );

        case "wins":
        default:
            return (
                <>
                    <td className="leaderboard-stat-column">
                        {player.wins}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.games_played}
                    </td>
                    <td className="leaderboard-stat-column">
                        {player.win_rate}%
                    </td>
                </>
            );
    }
}

function renderMobileStats(
    player: LeagueLeaderboardEntry
) {
    switch (view) {
        case "average_finish":
            return (
                <>
                    <div className="league-leaderboard-mobile-stat">
                        <span>Avg. Finish</span>
                        <strong>
                            {formatAverageFinish(player)}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Games</span>
                        <strong>
                            {player.games_played}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Wins</span>
                        <strong>
                            {player.wins}
                        </strong>
                    </div>
                </>
            );

        case "win_rate":
            return (
                <>
                    <div className="league-leaderboard-mobile-stat">
                        <span>Win %</span>
                        <strong>
                            {player.games_played >=
                            MINIMUM_GAMES_FOR_WIN_RATE
                                ? `${player.win_rate}%`
                                : "—"}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Wins</span>
                        <strong>
                            {player.wins}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Games</span>
                        <strong>
                            {player.games_played}
                        </strong>
                    </div>
                </>
            );

        case "record":
            return (
                <>
                    <div className="league-leaderboard-mobile-stat">
                        <span>Record</span>
                        <strong>
                            {player.wins}-{player.losses}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Win %</span>
                        <strong>
                            {player.win_rate}%
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Games</span>
                        <strong>
                            {player.games_played}
                        </strong>
                    </div>
                </>
            );

        case "games_played":
            return (
                <>
                    <div className="league-leaderboard-mobile-stat">
                        <span>Games</span>
                        <strong>
                            {player.games_played}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Wins</span>
                        <strong>
                            {player.wins}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Win %</span>
                        <strong>
                            {player.win_rate}%
                        </strong>
                    </div>
                </>
            );

        case "wins":
        default:
            return (
                <>
                    <div className="league-leaderboard-mobile-stat">
                        <span>Wins</span>
                        <strong>
                            {player.wins}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Games</span>
                        <strong>
                            {player.games_played}
                        </strong>
                    </div>

                    <div className="league-leaderboard-mobile-stat">
                        <span>Win %</span>
                        <strong>
                            {player.win_rate}%
                        </strong>
                    </div>
                </>
            );
    }
}

const sortedLeaderboard =
    getSortedLeaderboard();

return (
    <section className="league-section-card">
        <div className="league-leaderboard-header">
            <h2 className="league-section-title">
                Leaderboard
            </h2>

            <div className="league-leaderboard-view-control">
                <label htmlFor="leaderboard-view">
                    View
                </label>

                <select
                    id="leaderboard-view"
                    value={view}
                    onChange={(event) =>
                        setView(
                            event.target.value as LeaderboardView
                        )
                    }
                >
                    <option value="wins">
                        Wins
                    </option>

                    <option value="average_finish">
                        Average Finish
                    </option>

                    <option value="win_rate">
                        Win %
                    </option>

                    <option value="record">
                        Record
                    </option>

                    <option value="games_played">
                        Games Played
                    </option>
                </select>
            </div>
        </div>

        {view === "win_rate" && (
            <p className="league-leaderboard-note">
                Players need at least{" "}
                {MINIMUM_GAMES_FOR_WIN_RATE} games
                to qualify for the Win % ranking.
            </p>
        )}

        <div className="league-leaderboard-desktop">
            <table className="league-leaderboard-table">
                <thead>
                    <tr>
                        <th className="leaderboard-rank-column">
                            Rank
                        </th>

                        <th className="leaderboard-player-column">
                            Player
                        </th>

                        {renderDesktopHeaders()}
                    </tr>
                </thead>

                <tbody>
                    {sortedLeaderboard.map(
                        (player, index) => (
                            <tr
                                key={player.player_id}
                            >
                                <td className="leaderboard-rank-column">
                                    {getRankDisplay(
                                        index + 1
                                    )}
                                </td>

                                <td className="leaderboard-player-column">
                                    <button
                                        className="league-player-link"
                                        onClick={() =>
                                            navigate(
                                                `/player/${player.player_id}`
                                            )
                                        }
                                    >
                                        {player.display_name}
                                    </button>
                                </td>

                                {renderDesktopStats(
                                    player
                                )}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>

        <div className="league-leaderboard-mobile">
            {sortedLeaderboard.map(
                (player, index) => (
                    <div
                        className="league-leaderboard-player-card"
                        key={player.player_id}
                    >
                        <div className="league-leaderboard-player-top">
                            <div className="league-leaderboard-rank">
                                {getRankDisplay(
                                    index + 1
                                )}
                            </div>

                            <button
                                className="league-player-link league-leaderboard-mobile-player"
                                onClick={() =>
                                    navigate(
                                        `/player/${player.player_id}`
                                    )
                                }
                            >
                                {player.display_name}
                            </button>
                        </div>

                        <div className="league-leaderboard-mobile-stats">
                            {renderMobileStats(
                                player
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    </section>
);

}