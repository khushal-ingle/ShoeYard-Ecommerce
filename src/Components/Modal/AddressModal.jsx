import { useContext } from "react"
import { DataContext } from "../../Contexts/DataContext"
import "./AddressModal.css";
import { v4 as uuid } from "uuid";

export const AddressModal = () => {
    const { setAddressModal, setUserAddresses, addressInput, setAddressInput, addresses } = useContext(DataContext);
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <h3>Add Address</h3>
                        <i className="fa fa-times" aria-hidden="true" onClick={() => {
                            setAddressModal(false)
                            setAddressInput({ id: uuid(), name: "", address: "", pincode: "", country: "", phoneNumber: "" })
                        }} />
                    </div>
                    <div className="addressModal">
                        <div className="name-field">
                            <label htmlFor="name">
                                Name:
                            </label>
                            <input type="text" id="name" value={addressInput?.name}
                                onChange={(e) => {
                                    setAddressInput({
                                        ...addressInput,
                                        name: e.target.value,
                                    }

                                    )
                                }} />
                        </div>
                        <div className="address-field">
                            <label htmlFor="add">
                                Address:
                            </label>
                            <input type="text" id="add" value={addressInput?.address}
                                onChange={(e) =>
                                    setAddressInput({
                                        ...addressInput,
                                        address: e.target.value,
                                    })} />

                        </div>
                        <div className="pincode-field">
                            <label htmlFor="pincode">
                                PinCode:
                            </label>
                            <input type="text" id="pincode" value={addressInput?.pincode}
                                onChange={(e) =>
                                    setAddressInput({
                                        ...addressInput,
                                        pincode: e.target.value,
                                    })} />
                        </div>
                        <div className="country-field">
                            <label htmlFor="country">
                                Country:
                            </label>
                            <input type="text" id="country" value={addressInput?.country}
                                onChange={(e) =>
                                    setAddressInput({
                                        ...addressInput,
                                        country: e.target.value,
                                    })} />
                        </div>
                        <div className="phone-field">
                            <label htmlFor="phone">
                                Phone:
                            </label>
                            <input type="text" id="phone" value={addressInput?.phoneNumber}
                                onChange={(e) =>
                                    setAddressInput({
                                        ...addressInput,
                                        phoneNumber: e.target.value,
                                    })} />
                        </div>
                    </div>
                    <div>
                        <button className="add-btn" onClick={() => {
                            setAddressModal(false);
                            if (addresses.some((address) => address.id === addressInput.id)) {
                                setUserAddresses((prev) => prev.map(item => item.id === addressInput.id ? addressInput : item))
                            } else {
                                setUserAddresses((prev) => [...prev, addressInput])
                            }
                            setAddressInput({ id: uuid(), name: "", address: "", pincode: "", country: "", phoneNumber: "" })
                        }}>Add</button>
                    </div>
                </div>

            </div>
        </>
    )
}