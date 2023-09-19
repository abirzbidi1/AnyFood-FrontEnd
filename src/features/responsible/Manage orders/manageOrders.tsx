import { Table, TableHead, TableBody, TableRow, TableCell, CardContent, InputAdornment } from "@mui/material";
import { StyleCard, TableCellStyle, TableContainerStyle, BoxStyle, TypographyStyle, PaperStyle, FabStyle, InputBaseStyle } from '../ManageUser/ManageUser.style';
import LoadingPage from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import * as MuiIcons from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';
import { OrderData } from "./orderData";
import { useGenerateInvoiceQuery, useShowAllOrdersQuery } from "../../../redux/api/order/orderApi";
import { IOrder } from "../../../types/interfaces/orderInterface";
import ItemDetail from "./itemDetails";
import UserDetail from "./userDetails";

const ManageOrder = () => {
    const [searched, setSearched] = useState("");
    const { data, isError, isLoading, isSuccess } = useShowAllOrdersQuery({ searched });
    const { t } = useTranslation();
    const { data: invoice, error, refetch } = useGenerateInvoiceQuery();

    const handleDownloadPDF = () => {
        refetch().then(() => {
          // Si la requête RTK Query réussit, vous pouvez créer un lien pour télécharger le PDF
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'invoice.pdf'; // Nom du fichier PDF à télécharger
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      };

    if (isLoading) {
        return <LoadingPage />;
    }
    if (isError) {
        return <ErrorPage />;
    }
    if (isSuccess) {
        return (
            <StyleCard>
                <br /><br /><br />
                <CardContent >
                    <PaperStyle >
                        <BoxStyle>
                            <MuiIcons.People style={{ fontSize: '45px', color: '#404040' }} />
                            <TypographyStyle>
                                &nbsp;Manage Orders
                            </TypographyStyle>
                            <button onClick={handleDownloadPDF} disabled={isLoading}>
        Télécharger PDF
      </button>
      {error && <div>Une erreur s'est produite : {error.message}</div>}
                        </BoxStyle>
                        <TableContainerStyle className="Table_custom_style" >
                            <Table aria-label="simple table" stickyHeader >
                                <TableHead>
                                    <TableRow >
                                        {OrderData.map((data, index) => (
                                            <TableCellStyle className="head" align="center" key={index}>
                                                {data}
                                            </TableCellStyle>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.length > 0 && data.map((order: IOrder, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="body" align="center">
                                                <UserDetail userID={order.user_id} />
                                            </TableCell>
                                            <TableCell align="center" className="body">
                                                <ItemDetail itemId={order.item_id} />
                                            </TableCell>
                                            <TableCell align="center" className="body">{order.quantity}</TableCell>
                                            <TableCell align="center" className="body">{order.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainerStyle>
                    </PaperStyle>
                </CardContent>
            </StyleCard>
        );
    } else {
        return null;
    }
}
export default ManageOrder;