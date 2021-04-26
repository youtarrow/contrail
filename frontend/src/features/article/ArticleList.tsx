import React, { useState, useEffect } from "react";
import styles from "./ArticleList.module.css";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
  Button,
  Avatar,
  Badge,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableSortLabel,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDeleteArticle,
  selectArticles,
  editArticle,
  selectArticle,
} from "./articleSlice";
import { selectLoginUser, selectProfiles } from "../auth/authSlice";
import { AppDispatch } from "../../app/store";
import { initialState } from "./articleSlice";
import { SORT_STATE, READ_ARTICLE } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    tableLayout: "fixed",
  },
  button: {
    margin: theme.spacing(3),
  },
  small: {
    margin: "auto",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const ArticleList: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const loginUser = useSelector(selectLoginUser);
  const profiles = useSelector(selectProfiles);
  const columns = articles[0] && Object.keys(articles[0]);

  const [state, setState] = useState<SORT_STATE>({
    rows: articles,
    order: "desc",
    activeKey: "",
  });

  const handleClickSortColumn = (column: keyof READ_ARTICLE) => {
    const isDesc = column === state.activeKey && state.order === "desc";
    const newOrder = isDesc ? "asc" : "desc";
    const sortedRows = Array.from(state.rows).sort((a, b) => {
      if (a[column] > b[column]) {
        return newOrder === "asc" ? 1 : -1;
      } else if (a[column] < b[column]) {
        return newOrder === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });

    setState({
      rows: sortedRows,
      order: newOrder,
      activeKey: column,
    });
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      rows: articles,
    }));
  }, [articles]);

  const conditionalSrc = (user: number) => {
    const loginProfile = profiles.filter(
      (prof) => prof.user_profile === user
    )[0];
    return loginProfile?.img !== null ? loginProfile?.img : undefined;
  };

  return (
    <>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => {
          dispatch(
            editArticle({
              id: 0,
              title: "",
              content: "",
              category: 1,
            })
          );
          dispatch(selectArticle(initialState.selectedArticle));
        }}
      >
        新規投稿
      </Button>
      {articles[0]?.title && (
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map(
                (column, colIndex) =>
                  (column === "title" ||
                    column === "category" ||
                    column === "owner") && (
                    <TableCell align="center" key={colIndex}>
                      <TableSortLabel
                        active={state.activeKey === column}
                        direction={state.order}
                        onClick={() => handleClickSortColumn(column)}
                      >
                        <strong>{column}</strong>
                      </TableSortLabel>
                    </TableCell>
                  )
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.map((row, rowIndex) => (
              <TableRow hover key={rowIndex}>
                {Object.keys(row).map(
                  (key, colIndex) =>
                    (key === "title" || key === "category_item") && (
                      <TableCell
                        align="center"
                        className={styles.articlelist__hover}
                        key={`${rowIndex}+${colIndex}`}
                        onClick={() => {
                          dispatch(selectArticle(row));
                          dispatch(editArticle(initialState.editedArticle));
                        }}
                      >
                        {<span>{row[key]}</span>}
                      </TableCell>
                    )
                )}
                <TableCell>
                  <Avatar
                    className={classes.small}
                    alt="owner"
                    src={conditionalSrc(row["owner"])}
                  />
                </TableCell>
                <TableCell align="center">
                  <button
                    className={styles.articlelist__icon}
                    onClick={() => {
                      dispatch(fetchAsyncDeleteArticle(row.id));
                    }}
                    disabled={row["owner"] !== loginUser.id}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                  <button
                    className={styles.articlelist__icon}
                    onClick={() => dispatch(editArticle(row))}
                    disabled={row["owner"] !== loginUser.id}
                  >
                    <EditOutlinedIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ArticleList;
