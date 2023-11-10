"use client"

import React from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import VideoPlayerLanding from "./video-player-landing"

const testimonials1 = [
  {
    name: "Anish Karthik",
    avatar: "A",
    title: "Software Engineer",
    description:
      "This is the best trading Course I have ever taken! I have gained knowledge and how to use my money wisely!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Anandakannan",
    avatar: "A",
    title: "Student",
    description:
      "I have been studying this course for a while now and I have to say that it is the best trading course I have ever taken!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Dharun Prakash",
    avatar: "D",
    title: "Trader",
    description:
      "This trading course has provided me with the knowledge and skills to become a successful trader. I am very happy with the results!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Akash Raj",
    avatar: "A",
    title: "Businessman",
    description:
      "The best in the market! I have been trading for a while now and this course has helped me to become a better trader and increase my profits!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Atheshwaran",
    avatar: "A",
    title: "Student",
    description:
      "I have been studying this course for a while now and I have to say that it is the best trading course I have ever taken!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#green)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#green)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#green)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#green)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#green)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
]
const testimonials2 = [
  {
    name: "Anish Karthik",
    avatar: "A",
    title: "Software Engineer",
    description:
      "This is the best trading Course I have ever taken! I have gained knowledge and how to use my money wisely!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#orange)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Anandakannan",
    avatar: "A",
    title: "Student",
    description:
      "I have been studying this course for a while now and I have to say that it is the best trading course I have ever taken!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#blue)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Dharun Prakash",
    avatar: "D",
    title: "Trader",
    description:
      "This trading course has provided me with the knowledge and skills to become a successful trader. I am very happy with the results!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#purple)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Akash Raj",
    avatar: "A",
    title: "Businessman",
    description:
      "The best in the market! I have been trading for a while now and this course has helped me to become a better trader and increase my profits!",
    svg: (
      <svg
        width="101"
        height="20"
        viewBox="0 0 101 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <path
          d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <path
          d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <path
          d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <path
          d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
          fill="url(#pink)"
        ></path>
        <defs>
          <linearGradient
            id="orange"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            id="blue"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#4C73FF"></stop>
            <stop offset="1" stop-color="#389BFF"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="pink"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF4CC2"></stop>
            <stop offset="1" stop-color="#F87393"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="green"
            x1="0.166016"
            y1="8.41663"
            x2="86.8327"
            y2="8.41663"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="80%; 0%; 80%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#7AFFD7"></stop>
            <stop offset="1" stop-color="#00FFB2"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="gold"
            x1="2.55563"
            y1="10.5169"
            x2="88.9626"
            y2="10.5169"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>{" "}
            <animate
              attributeName="x1"
              dur="3s"
              values="50%; 0%; 50%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#FF7170"></stop>
            <stop offset="1" stop-color="#FFE57F"></stop>
          </linearGradient>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="purple"
            x1="1.13689"
            y1="4.45834"
            x2="18.5566"
            y2="5.48068"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="x1"
              dur="1.8s"
              values="100%; 40%; 100%"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              repeatCount="indefinite"
            ></animate>
            <stop stop-color="#854CFF"></stop>
            <stop offset="1" stop-color="#B673F8"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
]

const ReviewsSection = () => {
  return (
    <section className="">
      <div>
        <center>
          <h1 className="relative mb-12 text-4xl font-bold ">
            <span>Testimonials</span>
          </h1>
        </center>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex w-full flex-col gap-1">
              {testimonials1.map((item) => (
                <Card
                  key={item.description}
                  className="mb-2 border-none bg-secondary"
                >
                  <CardHeader className="!pb-0">
                    <CardTitle className="flex items-center gap-x-2">
                      {item.svg}
                    </CardTitle>
                    <CardContent className="px-0 pt-4">
                      {item.description}
                    </CardContent>
                  </CardHeader>
                  <CardFooter className="!-mt-3 ">
                    <div className="flex flex-row items-center justify-center gap-2 ">
                      <div>
                        <div className="rounded-full bg-tertiary-color px-[0.7rem] py-1 text-quaternary-color">
                          {item.avatar}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="!text-[13px] text-muted-foreground">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex w-full flex-col gap-1">
              {testimonials2.map((item) => (
                <Card
                  key={item.description}
                  className="mb-2 border-none bg-secondary"
                >
                  <CardHeader className="!pb-0">
                    <CardTitle className="flex items-center gap-x-2">
                      {item.svg}
                    </CardTitle>
                    <CardContent className="px-0 pt-4">
                      {item.description}
                    </CardContent>
                  </CardHeader>
                  <CardFooter className="!-mt-3 ">
                    <div className="flex flex-row items-center justify-center gap-2 ">
                      <div>
                        <div className="rounded-full bg-tertiary-color px-[0.7rem] py-1 text-quaternary-color">
                          {item.avatar}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="!text-[13px] text-muted-foreground">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-16 h-[500px] rounded-xl bg-clip-text">
            <VideoPlayerLanding url="https://youtu.be/SO8lBVWF2Y8?si=aafhnkzdHhVy6_7f" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
