import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedArticle } from "./articleSlice";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

const ArticleDisplay: React.FC = () => {
  const selectedArticle = useSelector(selectSelectedArticle);
  const rows = [
    { item: "Title", data: selectedArticle.title },
    { item: "Content", data: selectedArticle.content },
    { item: "Owner", data: selectedArticle.owner_username },
    { item: "Category", data: selectedArticle.category_item },
    { item: "Created", data: selectedArticle.created_at },
    { item: "Updated", data: selectedArticle.updated_at },
  ];

  if (!selectedArticle.title) {
    return null;
  }

  return (
    <>
      <h2>Article details</h2>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item}>
              <TableCell align="center">
                <strong>{row.item}</strong>
              </TableCell>
              <TableCell align="center">{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ArticleDisplay;
