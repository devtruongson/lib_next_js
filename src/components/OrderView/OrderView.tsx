"use client";

import { IBook } from "@/utils/interface";
import { Button, Col, Row } from "antd";
import React from "react";

const OrderView: React.FC<{ book: IBook }> = ({ book }) => {
    return (
        <div>
            <Row gutter={16}>
                <Col sm={12}>
                    <Button type="dashed" className="w-full h-[36px]">
                        Sách Đã Mượn
                    </Button>
                </Col>
                <Col sm={12}>
                    <Button type="primary" className="w-full h-[36px]">
                        Mượn Sách
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default OrderView;
