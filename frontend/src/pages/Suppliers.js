import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import SupplierForm from "../components/SupplierForm";
import SupplierTable from "../components/SupplierTable";
import supplierService from "../services/supplierService";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  const [company_name, setCompanyName] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await supplierService.getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSupplier = async () => {
    try {
      await supplierService.addSupplier({
        company_name,
        contact_person,
        phone,
        email,
        address,
        notes,
      });

      fetchSuppliers();
      clearForm();

    } catch (error) {
      console.log(error);
    }
  };

  const editSupplier = (supplier) => {
    setEditingId(supplier.id);

    setCompanyName(supplier.company_name);
    setContactPerson(supplier.contact_person);
    setPhone(supplier.phone);
    setEmail(supplier.email);
    setAddress(supplier.address);
    setNotes(supplier.notes);
  };

  const updateSupplier = async () => {
    try {
      await supplierService.updateSupplier(editingId, {
        company_name,
        contact_person,
        phone,
        email,
        address,
        notes,
      });

      fetchSuppliers();
      clearForm();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      await supplierService.deleteSupplier(id);

      fetchSuppliers();

    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setCompanyName("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setAddress("");
    setNotes("");
    setEditingId(null);
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h2 className="mb-1">🏢 Supplier Management</h2>

          <p className="text-light mb-4">
            Manage all hotel suppliers and their contact information.
          </p>

          <div className="row">

            <DashboardCard
              title="Total Suppliers"
              value={suppliers.length}
              bgColor="bg-primary"
            />

            <DashboardCard
              title="Companies"
              value={suppliers.length}
              bgColor="bg-success"
            />

            <DashboardCard
              title="Contacts"
              value={suppliers.length}
              bgColor="bg-warning"
            />

            <DashboardCard
              title="Database"
              value="Active"
              bgColor="bg-danger"
            />

          </div>

          <SupplierForm
            company_name={company_name}
            setCompanyName={setCompanyName}

            contact_person={contact_person}
            setContactPerson={setContactPerson}

            phone={phone}
            setPhone={setPhone}

            email={email}
            setEmail={setEmail}

            address={address}
            setAddress={setAddress}

            notes={notes}
            setNotes={setNotes}

            addSupplier={addSupplier}

            editingId={editingId}
            updateSupplier={updateSupplier}
          />

          <SupplierTable
            suppliers={suppliers}
            editSupplier={editSupplier}
            deleteSupplier={deleteSupplier}
          />

        </div>

      </div>
    </div>
  );
}

export default Suppliers;