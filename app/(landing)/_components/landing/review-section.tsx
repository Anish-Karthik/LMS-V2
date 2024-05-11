"use client"

import React from "react"

import TestimonialCard from "../../../../components/card/testimonial-card"
import VideoPlayerLanding from "./video-player-landing"

const testimonials1 = [

  {
    name: "Nikhil",
    avatar: "N",
    title: "Student",
    description:
      "Hello all This is Nikhil S, I recently had the opportunity to attend a trading course offered by Praglis, and I must say, it was an enlightening experience ,the course was meticulously structured by Siddharth my college senior. As someone new to the trading arena, the comprehensive curriculum designed by them not only laid down the fundamentals but also seamlessly integrated advanced trading strategies in an easy-to-understand manner. I joined the team as Cohort /Batch 3 and now I have even evolved to do paper trading and practice more. All thanks to team.",
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
    name: "Vijayalakshmi",
    avatar: "V",
    title: "Student",
    description:
      "I started trading with no idea but after 2session it's really helpful for me to learn about the share market and mentors are very friendly we can ask any doubts with them they will guide and give suggestions before taking trade... you ask even you didn't trade for years they will definitely guide you and you can also see others trading that will also help me to correct my mistakes I really enjoyed my trade journey ...and thanks to sidharth bro and kishor...💞",
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
    name: "Manikandan",
    avatar: "M",
    title: "Business",
    description:
      "This course was really good for beginners.Explained very clearly with simple terms Siddharth is always reachable to resolve any doubts They dont leave you once they course ends. They ll add you to their community  and support your in your share market career",
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
// add these testimonials:
// Name: Akash
// Occupation : Student

// Bro you are the one who jst taught the very basics of the market.And the support u gave to me naan ivlo live support irukkum neenga kathukratha again solli kuduppinganuh ellam nenachu kooda pakkala trading la evlo learn pannalum the credit is always to praglis(SID&ADHI). Unga way of teaching is something nxt lvl still Enakku neenga sonna examples mindla irukku. Tq bro

  {
    name: "Akash",
    avatar: "A",
    title: "Student",
    description:
      "Bro you are the one who jst taught the very basics of the market.And the support u gave to me naan ivlo live support irukkum neenga kathukratha again solli kuduppinganuh ellam nenachu kooda pakkala trading la evlo learn pannalum the credit is always to praglis(SID&ADHI). Unga way of teaching is something nxt lvl still Enakku neenga sonna examples mindla irukku. Tq bro",
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

// Name : Mohana Priya
// Occupation: Software Engineer

// Praglis team has handled excellent and highly comprehensive trading sessions, which is really impressive. With examples from real world situations, their explanations of everything from fundamentals to trade setup for swing and intraday sessions were outstanding.From my experience, I can tell that it is really detailed oriented session for people with no prior market expertise. In fact I can state that we are making money by following every idea that has been covered in class with proper risk management.

  {
    name: "Mohana Priya",
    avatar: "M",
    title: "Software Engineer",
    description:
      "Praglis team has handled excellent and highly comprehensive trading sessions, which is really impressive. With examples from real world situations, their explanations of everything from fundamentals to trade setup for swing and intraday sessions were outstanding.From my experience, I can tell that it is really detailed oriented session for people with no prior market expertise. In fact I can state that we are making money by following every idea that has been covered in class with proper risk management.",
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

// Name: Harritha S.
// Occupation : Software Developer

// I always want to make passive income as I don't have to spend my time and tried Praglis course to know about trading and stuff. As I started the course just happened to learn a lot about trading and stocks. So it is my first and best thing I have ever done to increase my income. It greatly improves my view on the stock market. Just thankful for the Praglis team

  {
    name: "Harritha S.",
    avatar: "H",
    title: "Software Developer",
    description:
      "I always want to make passive income as I don't have to spend my time and tried Praglis course to know about trading and stuff. As I started the course just happened to learn a lot about trading and stocks. So it is my first and best thing I have ever done to increase my income. It greatly improves my view on the stock market. Just thankful for the Praglis team",
    svg: (<svg
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

// Name: Dharani
// Occupation : Student

// Praglis is really a friendly environment to learn trade, the lectures and the course was informative.We could find opportunities for real time experience on the concepts. Enough provisions and support was extended for clarifying our doubts .Interactive live sessions were the best ones to know the live market movements and practical concepts of taking a trade was clearly explained.The team is always helpful in clearing doubts and the sufficient resources were provided for further understanding and development.Praglis is simply a neat and organized teaching team to learn and earn in trade.

  {
    name: "Dharani",
    avatar: "D",
    title: "Student",
    description:
      "Praglis is really a friendly environment to learn trade, the lectures and the course was informative.We could find opportunities for real time experience on the concepts. Enough provisions and support was extended for clarifying our doubts .Interactive live sessions were the best ones to know the live market movements and practical concepts of taking a trade was clearly explained.The team is always helpful in clearing doubts and the sufficient resources were provided for further understanding and development.Praglis is simply a neat and organized teaching team to learn and earn in trade.",
    svg: (<svg
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

// Name: Ashik Raja
// Occupation : Business

// A very well versed beginner’s course for learning the basics of the stock market - the main objective of this course offered by Praglis team is understanding the technical analysis of market by using candle sticks , and insight about the fundamentals analysis .

// The presentation and explanation of the course which covers various tools is crystal clear and easy to understand even for a person who doesn’t know anything about share market !

// The highlight of joining this course is , the team continues to offer you a discord group where the traders are interacting with each other and explains the trend of the market which gives us an overview about how the trades are done correctly!

// The guidance for trading is given for life time is an added advantage.

// I felt it to be a very useful course, hope you too will find.

// Thanks

  {
    name: "Ashik Raja",
    avatar: "A",
    title: "Business",
    description:
      "A very well versed beginner’s course for learning the basics of the stock market - the main objective of this course offered by Praglis team is understanding the technical analysis of market by using candle sticks , and insight about the fundamentals analysis .The presentation and explanation of the course which covers various tools is crystal clear and easy to understand even for a person who doesn’t know anything about share market !The highlight of joining this course is , the team continues to offer you a discord group where the traders are interacting with each other and explains the trend of the market which gives us an overview about how the trades are done correctly!The guidance for trading is given for life time is an added advantage.I felt it to be a very useful course, hope you too will find.Thanks",
    svg: (<svg
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

]

const ReviewsSection = () => {
  return (
    <section className="w-full bg-black py-24 max-xl:px-4" id="reviews">
      <div>
        <center>
          <h1 className="text-text-primary relative mb-12 text-4xl font-bold">
            <span>Testimonials</span>
          </h1>
        </center>
      </div>
      <div>
        <div className="flex flex-col gap-5">
          {/* <div className="mx-auto aspect-video w-full max-w-3xl rounded-xl bg-clip-text">
            <VideoPlayerLanding url="https://youtu.be/SO8lBVWF2Y8?si=aafhnkzdHhVy6_7f" />
          </div> */}
          <div className="mx-auto max-w-3xl gap-x-2">
            <div className="grid w-full gap-3 gap-x-4 lg:grid-cols-2">
              {testimonials1.map((item) => (
                <TestimonialCard
                  {...item}
                  key={item.description}
                  className="!max-w-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
