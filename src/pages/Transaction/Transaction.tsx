import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Pagination from "../../components/pagination/Pagination";
import { IQueryParams } from "../../types";
import TransactionList from "../../components/transaction/TransactionList";
import { ITransaction } from "../../types/ITransaction";
import {
  useChangeStatusTransactionMutation,
  useQueryGetTransactions,
} from "../../services/transaction";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Select from "../../components/form/Select";
import {
  StatusTransaction,
  TypeBankAccount,
} from "../../shared/constants/common";
import DatePicker from "../../components/form/date-picker";
import { nanoid } from "nanoid";

export default function Transaction() {
  const [filter, setFilter] = useState<
    IQueryParams & {
      searchKeyword?: string;
    }
  >({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchText, setSearchText] = useState("");
  const [statusType, setStatusType] = useState({
    status: "",
    type: "",
  });
  const [date, setDate] = useState({
    start: "",
    end: "",
  });
  const [resetKey, setResetKey] = useState({
    start: 1,
    end: 2,
  });

  const handleReset = () => {
    setResetKey({
      start: resetKey?.start + 1,
      end: resetKey?.end + 1,
    });
  };

  const { data: transactions, refetch } = useQueryGetTransactions(filter);
  const changeStatusTransactionMutation = useChangeStatusTransactionMutation();

  const handleEditCategory = (status: string, data: ITransaction) => {
    changeStatusTransactionMutation.mutate(
      { status, transactionId: data?._id },
      {
        onSuccess: () => {
          handleRefetchData();
        },
      }
    );
  };

  const handleRefetchData = () => {
    refetch();
  };

  const handleFilterSelectStatus = (e: string) => {
    setStatusType({
      ...statusType,
      status: e,
    });
  };

  const handleFilterSelectType = (e: string) => {
    setStatusType({
      ...statusType,
      type: e,
    });
  };
  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <PageBreadcrumb pageTitle="Transaction" />
        </div>
        <div className="mb-5 flex items-end gap-2 flex-wrap">
          <Input
            placeholder="Search"
            value={searchText}
            className="!w-fit"
            onChange={(e) => setSearchText(e?.target?.value)}
          />
          <Select
            key={nanoid()}
            defaultValue={statusType?.type}
            options={TypeBankAccount}
            placeholder="Select type"
            onChange={(e: string) => {
              handleFilterSelectType(e);
            }}
            className="dark:bg-dark-900 !w-[120px] !p-0 !text-center"
          />
          <Select
            key={nanoid()}
            defaultValue={statusType?.status}
            options={(
              Object.keys(StatusTransaction) as Array<
                keyof typeof StatusTransaction
              >
            ).map((item) => ({
              label: item,
              value: StatusTransaction[item],
            }))}
            placeholder="Select status"
            onChange={(e: string) => {
              handleFilterSelectStatus(e);
            }}
            className="dark:bg-dark-900 !w-[120px] !p-0 !text-center"
          />
          <DatePicker
            key={resetKey?.start}
            defaultDate={new Date()}
            id="Start_date-picker"
            label="Start date"
            placeholder="Select a start date"
            onChange={(dates, currentDateString) => {
              console.log("🚀 ~ ).map ~ dates:", dates);
              setDate({
                ...date,
                start: currentDateString,
              });
            }}
          />
          <DatePicker
            key={resetKey?.end}
            id="End_date-picker"
            label="End date"
            placeholder="Select a end date"
            onChange={(dates, currentDateString) => {
              console.log("🚀 ~ ).map ~ dates:", dates);
              setDate({
                ...date,
                end: currentDateString,
              });
            }}
          />
          <Button
            size="sm"
            onClick={() => {
              setSearchText("");
              setStatusType({
                status: "",
                type: "",
              });
              setFilter({
                pageIndex: 0,
                pageSize: 10,
              });
              setDate({
                start: "",
                end: "",
              });
              handleReset();
            }}
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setFilter({
                ...filter,
                ...statusType,
                ...date,
                searchKeyword: searchText,
              });
            }}
          >
            Search
          </Button>
        </div>
        <div>
          <TransactionList
            transactions={transactions?.data || []}
            handleEditCategory={handleEditCategory}
          />
          <div className="flex justify-end">
            {!isEmpty(transactions?.data) && (
              <Pagination
                page={transactions?.pagination?.page as number}
                pageLength={transactions?.pagination?.pageSize as number}
                totalRecords={transactions?.pagination?.count as number}
                onPageChange={(page, pageLength) => {
                  setFilter({
                    ...filter,
                    pageSize: pageLength,
                    pageIndex: page - 1,
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
