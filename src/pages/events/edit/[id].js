import React, { useState } from "react";
import Layout from "components/Layout";
import Link from "next/link";
import Image from "next/image";
import styles from "styles/Form.module.css";
import { toast } from "react-toastify";
import { API_URL } from "config";
import { useRouter } from "next/router";
import moment from "moment";
import { FaImage } from "react-icons/fa";
import Modal from "components/Modal";
import ImageUpload from "components/ImageUpload";
function EditEventPage({ event }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.url : null
  );
  const [data, setdata] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: moment(event.date).format("YYYY-MM-DD"),
    time: event.time,
    description: event.description,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleEmptyFields = Object.values(data).some((value) => value === "");
    console.log(handleEmptyFields);
    if (handleEmptyFields) {
      toast.error("Please fill in all fields");
    }
    const response = await fetch(`${API_URL}/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      toast.error("Something Went Wrong");
    } else {
      const event = await response.json();
      console.log(event);
      router.push(`/events/${event.slug}`);
    }
  };

  const imageUploaded = async (e) => {
    const response = await fetch(`${API_URL}/events/${event.id}`);
    const data = await response.json();
    setImagePreview(data.image.url);
    setShowModal(false);
  };
  return (
    <Layout>
      <Link href="/events">Go Back</Link>

      <h1>Edit Event</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={data.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={data.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={data.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={data.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={data.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type="submit" value="Edit Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} width={170} height={100} />
      ) : (
        <p>No image upload</p>
      )}
      <Modal
        show={showModal}
        title={"Upload Event Image"}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ImageUpload eventId={event.id} imageUploaded={imageUploaded} />
      </Modal>
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => setShowModal(true)}
        >
          <FaImage /> Set Image
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const response = await fetch(`${API_URL}/events/${id}`);
  const data = await response.json();
  return {
    props: {
      event: data,
    },
  };
};

export default EditEventPage;
