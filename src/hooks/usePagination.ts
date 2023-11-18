import { HandleApi } from "@/services/HandleAPI";
import { ILink, IMeta, IPaginCom, IPagin } from "@/utils/interface";
import { useEffect, useState } from "react";

interface IProps {
    api: Function;
    page: number;
    pageSize: number;
    isToken: boolean;
    is_load_more?: boolean;
    conditions?: any;
    is_reload?: boolean;
    is_search?: boolean;
    search_reload?: string;
}

const usePagination = <DataType>({
    api,
    page,
    pageSize,
    is_search = false,
    isToken = false,
    is_load_more = false,
    conditions,
    is_reload = false,
    search_reload = "",
}: IProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<DataType[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [pagination, setPagination] = useState<IPaginCom>({
        page,
        pageSize,
    });

    useEffect(() => {
        if (is_search && !search_reload) {
            return;
        }

        const _fetch = async (): Promise<void> => {
            let Res: IPagin<DataType[], IMeta, ILink> | null;
            try {
                setIsLoading(true);
                if (isToken) {
                    Res = await HandleApi(api, {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        ...conditions,
                    });
                } else {
                    Res = await api({
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        ...conditions,
                    });
                }

                if (Res) {
                    const dataRes = Res!.items;
                    if (is_load_more) {
                        setData((prev) => [...prev, ...dataRes]);
                    } else {
                        setData(dataRes);
                    }

                    setMeta(Res.meta);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        _fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        pagination.page,
        pagination.pageSize,
        api,
        is_reload,
        search_reload,
        is_search,
    ]);

    const handleChangePage = (page: number): void => {
        if (meta) {
            if (page > 0 && page <= meta.totalPages) {
                setPagination((prev: any) => ({
                    ...prev,
                    page: page,
                }));
            }
        }
    };

    return {
        isLoading,
        data,
        meta,
        handleChangePage,
    };
};

export default usePagination;
