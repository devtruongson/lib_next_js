"use client";
import { CopyClipBoard } from "@/components/CopyToClipboard/CopyToClipboard";
import handleValidateForm from "@/helpers/handleValidateForm";
import validateImageFile from "@/helpers/validateImageFIle";
import { HandleApi } from "@/services/HandleAPI";
import {
    getCurrentUserService,
    updateUserService,
    uploadImageService,
} from "@/services/userService";
import { IProfile, IRes, IUpdateProfile, IUser } from "@/utils/interface";
import { Button, Checkbox, Image, Spin } from "antd";
import { HttpStatusCode } from "axios";
import { NextPage } from "next";
import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Swal from "sweetalert2";
import moment from "moment";

const Profile: NextPage = () => {
    const [profile, setProfile] = useState<IProfile>({
        id: 0,
        address: "",
        avatar_url: "",
        birthday: "",
        class: "",
        description: "",
        phoneNumber: "",
        school: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>({
        id: 0,
        email: "",
        fistName: "",
        lastName: "",
        is_login_fire_base: false,
        is_verify_email: false,
        role: "user",
        slug: "",
    });
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>("");
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const _fetch = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const Res: IRes<IUser> = await HandleApi(getCurrentUserService);
                if (Res.statusCode === HttpStatusCode.Ok) {
                    if (Res.data.profile) {
                        setProfile((prev) => ({
                            ...prev,
                            ...Res.data.profile,
                        }));
                    }
                    setUser((prev) => ({
                        ...prev,
                        ...Res.data,
                    }));
                }
            } catch (error) {
                console.log(error);
                Swal.fire("Ohh!", "Something went wrong", "info");
            }
            setIsLoading(false);
        };

        _fetch();
    }, []);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeInputProfile = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const optionAccount: { value: string; label: string }[] = useMemo(
        () => [
            {
                value: "true",
                label: "Tài Khoản Thường",
            },
            {
                value: "false",
                label: "Tài Khoản FireBase",
            },
        ],
        []
    );

    const handleChooseFileAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files[0]) {
            const avatar = e.target.files[0];
            const checkValidFile = validateImageFile(avatar.name);
            if (!checkValidFile) {
                Swal.fire("Ohh", "File Not Valid", "info");
                return;
            }
            setAvatar(avatar);
        }
    };

    const handleClickChooseAvatar = (): void => {
        const inputElement = ref.current;
        if (inputElement) {
            inputElement.click();
        }
    };

    useEffect(() => {
        if (!avatar) return;
        setAvatarPreview(URL.createObjectURL(avatar));
        URL.revokeObjectURL(avatarPreview);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

    const handleSubmitData = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (!avatar && !profile.avatar_url) {
            Swal.fire("Ohh", "Bạn Phải Chọn Ảnh", "info");
            return;
        }

        const arrValidate = [
            user.fistName,
            user.lastName,
            profile.address,
            profile.birthday,
            profile.class,
            profile.description,
            profile.phoneNumber,
            profile.school,
        ];
        const checkValidateInput = handleValidateForm(arrValidate);
        if (!checkValidateInput) return;
        setIsLoading(true);
        try {
            let url_profile_link: string = profile.avatar_url;
            if (avatar) {
                const Res = await uploadImageService({
                    image: avatar,
                });
                url_profile_link = Res.data.filename;
            }
            const dataBuilder: IUpdateProfile = {
                user: {
                    firstName: user.fistName,
                    lastName: user.lastName,
                },
                profile: {
                    address: profile.address,
                    avatar_url: url_profile_link,
                    birthday: profile.birthday,
                    class: profile.class,
                    description: profile.description,
                    phoneNumber: profile.phoneNumber,
                    school: profile.school,
                },
            };
            const Res: IRes<any> = await HandleApi(
                updateUserService,
                dataBuilder
            );
            if (Res.statusCode === HttpStatusCode.Ok) {
                Swal.fire("Ohh", "Bạn Đã Cập Nhật Thành Công!", "success");
            }
            setTimeout(() => {
                window.location.reload();
            }, 600);
        } catch (error) {
            console.log(error);
            Swal.fire("Ohh", "Something went wrong", "info");
        }
        setIsLoading(false);
    };

    return (
        <div className="pb-8">
            <Spin fullscreen spinning={isLoading} />
            <div className="py-2 px-1">
                <form onSubmit={handleSubmitData}>
                    <div className="pt-3 pb-8">
                        <div className="flex justify-center items-end py-3">
                            <input
                                ref={ref}
                                type="file"
                                hidden
                                accept=".png, .jpg, .jpeg"
                                onChange={handleChooseFileAvatar}
                            />
                            <Image
                                onClick={handleClickChooseAvatar}
                                preview={false}
                                src={
                                    avatarPreview
                                        ? avatarPreview
                                        : profile.avatar_url
                                        ? profile.avatar_url.slice(0, 5) ===
                                          "https"
                                            ? profile.avatar_url
                                            : process.env
                                                  .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                              "/upload/folder/app/" +
                                              profile?.avatar_url +
                                              "/upload"
                                        : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg"
                                }
                                alt="Hình Ảnh Avatar"
                                className="w-[100px] h-[100px] border-[1px] border-solid border-[#ccc] rounded-sm object-cover avatar-profile"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                            <div className="relative z-0 w-full group mb-6 md:mb-0">
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=""
                                    required
                                    value={
                                        profile.phoneNumber
                                            ? profile.phoneNumber
                                            : ""
                                    }
                                    onChange={handleChangeInputProfile}
                                />
                                <label
                                    htmlFor="phoneNumber"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Phone Number
                                </label>
                            </div>
                            <div className="relative z-0 w-full group mb-6 md:mb-0">
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=""
                                    required
                                    value={
                                        profile.address ? profile.address : ""
                                    }
                                    onChange={handleChangeInputProfile}
                                />
                                <label
                                    htmlFor="address"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Address
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                            <div className="relative z-0 w-full group mb-6 md:mb-0">
                                <input
                                    type="text"
                                    name="class"
                                    id="class"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=""
                                    required
                                    value={profile.class ? profile.class : ""}
                                    onChange={handleChangeInputProfile}
                                />
                                <label
                                    htmlFor="class"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Lớp Học
                                </label>
                            </div>
                            <div className="relative z-0 w-full group mb-6 md:mb-0">
                                <input
                                    type="text"
                                    name="school"
                                    id="school"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=""
                                    required
                                    value={profile.school ? profile.school : ""}
                                    onChange={handleChangeInputProfile}
                                />
                                <label
                                    htmlFor="school"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Trường Học
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                            <div className="relative z-0 w-full group mb-6 md:mb-0">
                                <input
                                    type="date"
                                    name="birthday"
                                    id="birthday"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=""
                                    required
                                    value={
                                        profile.birthday
                                            ? moment(profile.birthday).format(
                                                  "YYYY-MM-DD"
                                              )
                                            : ""
                                    }
                                    onChange={handleChangeInputProfile}
                                />
                                <label
                                    htmlFor="birthday"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Sinh Nhật
                                </label>
                            </div>
                            <div className="relative z-0 w-full group mb-6 md:mb-0">
                                <textarea
                                    name="description"
                                    id="description"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=""
                                    required
                                    value={
                                        profile.description
                                            ? profile.description
                                            : ""
                                    }
                                    onChange={handleChangeInputProfile}
                                />
                                <label
                                    htmlFor="description"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Mô Tả Về Bản Thân
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full group mb-6 md:mb-0">
                            <input
                                type="email"
                                id="email"
                                className="block cursor-not-allowed disabled:text-slate-400 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                required
                                value={user.email}
                                onChange={handleChangeInput}
                                disabled
                                name="email"
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email address
                            </label>
                        </div>
                        <div className="relative z-0 w-full group mb-6 md:mb-0">
                            <div>
                                <CopyClipBoard
                                    is_render_children
                                    text={`${user.slug}`}
                                >
                                    <p className="block cursor-pointer py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                        {user.slug}
                                    </p>
                                </CopyClipBoard>
                            </div>
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Link Profile
                            </label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full group mb-6 md:mb-0">
                            <input
                                type="text"
                                name="fistName"
                                id="firstName"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={user.fistName}
                                onChange={handleChangeInput}
                            />
                            <label
                                htmlFor="firstName"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                First name
                            </label>
                        </div>
                        <div className="relative z-0 w-full group mb-6 md:mb-0">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={user.lastName}
                                onChange={handleChangeInput}
                            />
                            <label
                                htmlFor="lastName"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Last name
                            </label>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[14px] font-[500] pb-2">
                                Loại Tài Khoản
                            </h4>
                            <Checkbox.Group
                                value={[
                                    user.is_login_fire_base ? "false" : "true",
                                ]}
                                disabled
                                options={optionAccount}
                            />
                        </div>
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="float-right"
                    >
                        Cập Nhật Thông Tin
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
