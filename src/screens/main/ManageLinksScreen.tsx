import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert, KeyboardAvoidingView, Platform, ScrollView, Animated, Pressable, Image } from 'react-native';
import { theme } from '../../theme/Theme';
import { Plus, Edit2, Trash2, X, Phone, User, Globe, MessageCircle, ChevronDown, Check, Mail, Music } from 'lucide-react-native';
import Svg, { Path, Rect, Line, Circle, Polygon, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

const BrandInstagram = ({ size, color }: any) => (
  <Svg
    width={size || 32}
    height={size || 32}
    viewBox="0 0 132 132"
  >
    <Defs>
      <RadialGradient
        id="instagram_svg__c"
        cx={158.429}
        cy={578.088}
        r={65}
        fx={158.429}
        fy={578.088}
        gradientTransform="matrix(0 -1.98198 1.8439 0 -1031.402 454.004)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#fd5" />
        <Stop offset={0.1} stopColor="#fd5" />
        <Stop offset={0.5} stopColor="#ff543e" />
        <Stop offset={1} stopColor="#c837ab" />
      </RadialGradient>
      <RadialGradient
        id="instagram_svg__d"
        cx={147.694}
        cy={473.455}
        r={65}
        fx={147.694}
        fy={473.455}
        gradientTransform="matrix(.17394 .86872 -3.5818 .71718 1648.348 -458.493)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#3771c8" />
        <Stop offset={0.128} stopColor="#3771c8" />
        <Stop offset={1} stopColor="#60f" stopOpacity={0} />
      </RadialGradient>
    </Defs>
    <Path
      fill="url(#instagram_svg__c)"
      d="M65.03 0C37.888 0 29.95.028 28.407.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468C4 13.126 1.5 18.394.595 24.656c-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12s32.84-.02 34.41-.1c4.4-.207 6.955-.55 9.78-1.28a27.22 27.22 0 0 0 17.75-14.53c1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624C116.9 4 111.64 1.5 105.372.596 102.335.157 101.73.027 86.19 0z"
      transform="translate(1.004 1)"
    />
    <Path
      fill="url(#instagram_svg__d)"
      d="M65.03 0C37.888 0 29.95.028 28.407.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468C4 13.126 1.5 18.394.595 24.656c-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12s32.84-.02 34.41-.1c4.4-.207 6.955-.55 9.78-1.28a27.22 27.22 0 0 0 17.75-14.53c1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624C116.9 4 111.64 1.5 105.372.596 102.335.157 101.73.027 86.19 0z"
      transform="translate(1.004 1)"
    />
    <Path
      fill="#fff"
      d="M66.004 18c-13.036 0-14.672.057-19.792.29-5.11.234-8.598 1.043-11.65 2.23-3.157 1.226-5.835 2.866-8.503 5.535-2.67 2.668-4.31 5.346-5.54 8.502-1.19 3.053-2 6.542-2.23 11.65C18.06 51.327 18 52.964 18 66s.058 14.667.29 19.787c.235 5.11 1.044 8.598 2.23 11.65 1.227 3.157 2.867 5.835 5.536 8.503 2.667 2.67 5.345 4.314 8.5 5.54 3.054 1.187 6.543 1.996 11.652 2.23 5.12.233 6.755.29 19.79.29 13.037 0 14.668-.057 19.788-.29 5.11-.234 8.602-1.043 11.656-2.23 3.156-1.226 5.83-2.87 8.497-5.54 2.67-2.668 4.31-5.346 5.54-8.502 1.18-3.053 1.99-6.542 2.23-11.65.23-5.12.29-6.752.29-19.788s-.06-14.672-.29-19.792c-.24-5.11-1.05-8.598-2.23-11.65-1.23-3.157-2.87-5.835-5.54-8.503-2.67-2.67-5.34-4.31-8.5-5.535-3.06-1.187-6.55-1.996-11.66-2.23-5.12-.233-6.75-.29-19.79-.29zm-4.306 8.65c1.278-.002 2.704 0 4.306 0 12.816 0 14.335.046 19.396.276 4.68.214 7.22.996 8.912 1.653 2.24.87 3.837 1.91 5.516 3.59 1.68 1.68 2.72 3.28 3.592 5.52.657 1.69 1.44 4.23 1.653 8.91.23 5.06.28 6.58.28 19.39s-.05 14.33-.28 19.39c-.214 4.68-.996 7.22-1.653 8.91-.87 2.24-1.912 3.835-3.592 5.514s-3.275 2.72-5.516 3.59c-1.69.66-4.232 1.44-8.912 1.654-5.06.23-6.58.28-19.396.28s-14.336-.05-19.396-.28c-4.68-.216-7.22-.998-8.913-1.655-2.24-.87-3.84-1.91-5.52-3.59s-2.72-3.276-3.592-5.517c-.657-1.69-1.44-4.23-1.653-8.91-.23-5.06-.276-6.58-.276-19.398s.046-14.33.276-19.39c.214-4.68.996-7.22 1.653-8.912.87-2.24 1.912-3.84 3.592-5.52s3.28-2.72 5.52-3.592c1.692-.66 4.233-1.44 8.913-1.655 4.428-.2 6.144-.26 15.09-.27zm29.928 7.97a5.76 5.76 0 1 0 5.76 5.758c0-3.18-2.58-5.76-5.76-5.76zm-25.622 6.73c-13.613 0-24.65 11.037-24.65 24.65s11.037 24.645 24.65 24.645S90.65 79.613 90.65 66 79.616 41.35 66.003 41.35zm0 8.65c8.836 0 16 7.163 16 16s-7.164 16-16 16-16-7.164-16-16 7.163-16 16-16"
    />
  </Svg>
);

const BrandSnapchat = ({ size, ...props }: any) => (
  <Svg
    width={size || 32}
    height={size || 32}
    viewBox="147.353 39.286 514.631 514.631"
    {...props}
  >
    <Path
      d="M147.553 423.021v.023c.308 11.424.403 22.914 2.33 34.268 2.042 12.012 4.961 23.725 10.53 34.627 7.529 14.756 17.869 27.217 30.921 37.396 9.371 7.309 19.608 13.111 30.94 16.771 16.524 5.33 33.571 7.373 50.867 7.473 10.791.068 21.575.338 32.37.293 78.395-.33 156.792.566 235.189-.484 10.403-.141 20.636-1.41 30.846-3.277 19.569-3.582 36.864-11.932 51.661-25.133 17.245-15.381 28.88-34.205 34.132-56.924 3.437-14.85 4.297-29.916 4.444-45.035v-3.016c0-1.17-.445-256.892-.486-260.272-.115-9.285-.799-18.5-2.54-27.636-2.117-11.133-5.108-21.981-10.439-32.053-5.629-10.641-12.68-20.209-21.401-28.57-13.359-12.81-28.775-21.869-46.722-26.661-16.21-4.327-32.747-5.285-49.405-5.27-.027-.004-.09-.173-.094-.255H278.56q-.006.13-.014.255c-9.454.173-18.922.102-28.328 1.268-10.304 1.281-20.509 3.21-30.262 6.812-15.362 5.682-28.709 14.532-40.11 26.347-12.917 13.386-22.022 28.867-26.853 46.894-4.31 16.084-5.248 32.488-5.271 49.008"
      fill="#fffc00"
    />
    <Path
      d="M407.001 473.488c-1.068 0-2.087-.039-2.862-.076-.615.053-1.25.076-1.886.076-22.437 0-37.439-10.607-50.678-19.973-9.489-6.703-18.438-13.031-28.922-14.775-5.149-.854-10.271-1.287-15.22-1.287-8.917 0-15.964 1.383-21.109 2.389-3.166.617-5.896 1.148-8.006 1.148-2.21 0-4.895-.49-6.014-4.311-.887-3.014-1.523-5.934-2.137-8.746-1.536-7.027-2.65-11.316-5.281-11.723-28.141-4.342-44.768-10.738-48.08-18.484a7.2 7.2 0 0 1-.584-2.443 4.52 4.52 0 0 1 3.777-4.711c22.348-3.68 42.219-15.492 59.064-35.119 13.049-15.195 19.457-29.713 20.145-31.316a3 3 0 0 1 .101-.217c3.247-6.588 3.893-12.281 1.926-16.916-3.626-8.551-15.635-12.361-23.58-14.882-1.976-.625-3.845-1.217-5.334-1.808-7.043-2.782-18.626-8.66-17.083-16.773 1.124-5.916 8.949-10.036 15.273-10.036 1.756 0 3.312.308 4.622.923 7.146 3.348 13.575 5.045 19.104 5.045 6.876 0 10.197-2.618 11-3.362a1171 1171 0 0 0-.679-11.262c-1.614-25.675-3.627-57.627 4.546-75.95 24.462-54.847 76.339-59.112 91.651-59.112a3910 3910 0 0 0 7.582-.071c15.354 0 67.339 4.27 91.816 59.15 8.173 18.335 6.158 50.314 4.539 76.016l-.076 1.23c-.222 3.49-.427 6.793-.6 9.995.756.696 3.795 3.096 9.978 3.339 5.271-.202 11.328-1.891 17.998-5.014 2.062-.968 4.345-1.169 5.895-1.169 2.343 0 4.727.456 6.714 1.285l.106.041c5.66 2.009 9.367 6.024 9.447 10.242.071 3.932-2.851 9.809-17.223 15.485-1.472.583-3.35 1.179-5.334 1.808-7.952 2.524-19.951 6.332-23.577 14.878-1.97 4.635-1.322 10.326 1.926 16.912.036.072.067.145.102.221 1 2.344 25.205 57.535 79.209 66.432a4.523 4.523 0 0 1 3.778 4.711 7.3 7.3 0 0 1-.598 2.465c-3.289 7.703-19.915 14.09-48.064 18.438-2.642.408-3.755 4.678-5.277 11.668-.63 2.887-1.271 5.717-2.146 8.691-.819 2.797-2.641 4.164-5.567 4.164h-.441c-1.905 0-4.604-.346-8.008-1.012-5.95-1.158-12.623-2.236-21.109-2.236-4.948 0-10.069.434-15.224 1.287-10.473 1.744-19.421 8.062-28.893 14.758-13.265 9.379-28.272 19.987-50.707 19.987"
      fill="#fff"
    />
    <Path
      d="M408.336 124.235c14.455 0 64.231 3.883 87.688 56.472 7.724 17.317 5.744 48.686 4.156 73.885-.248 3.999-.494 7.875-.694 11.576l-.084 1.591 1.062 1.185c.429.476 4.444 4.672 13.374 5.017l.144.008.15-.003c5.904-.225 12.554-2.059 19.776-5.442 1.064-.498 2.48-.741 3.978-.741 1.707 0 3.521.321 5.017.951l.226.09c3.787 1.327 6.464 3.829 6.505 6.093.022 1.28-.935 5.891-14.359 11.194-1.312.518-3.039 1.069-5.041 1.7-8.736 2.774-21.934 6.96-26.376 17.427-2.501 5.896-1.816 12.854 2.034 20.678 1.584 3.697 26.52 59.865 82.631 69.111a2.5 2.5 0 0 1-.229.9c-.951 2.24-6.996 9.979-44.612 15.783-5.886.902-7.328 7.5-9 15.17-.604 2.746-1.218 5.518-2.062 8.381-.258.865-.306.914-1.233.914h-.442c-1.668 0-4.2-.346-7.135-.922-5.345-1.041-12.647-2.318-21.982-2.318-5.21 0-10.577.453-15.962 1.352-11.511 1.914-20.872 8.535-30.786 15.543-13.314 9.408-27.075 19.143-48.071 19.143-.917 0-1.812-.031-2.709-.076l-.236-.01-.237.018q-.77.068-1.564.068c-20.993 0-34.76-9.732-48.068-19.143-9.916-7.008-19.282-13.629-30.791-15.543-5.38-.896-10.752-1.352-15.959-1.352-9.333 0-16.644 1.428-21.978 2.471-2.935.574-5.476 1.066-7.139 1.066-1.362 0-1.388-.08-1.676-1.064-.844-2.865-1.461-5.703-2.062-8.445-1.676-7.678-3.119-14.312-9.002-15.215-37.613-5.809-43.659-13.561-44.613-15.795a2.7 2.7 0 0 1-.231-.918c56.11-9.238 81.041-65.408 82.63-69.119 3.857-7.818 4.541-14.775 2.032-20.678-4.442-10.461-17.638-14.653-26.368-17.422-2.007-.635-3.735-1.187-5.048-1.705-11.336-4.479-14.823-8.991-14.305-11.725.601-3.153 6.067-6.359 10.837-6.359 1.072 0 2.012.173 2.707.498 7.747 3.631 14.819 5.472 21.022 5.472 9.751 0 14.091-4.537 14.557-5.055l1.057-1.182-.085-1.583c-.197-3.699-.44-7.574-.696-11.565-1.583-25.205-3.563-56.553 4.158-73.871 23.37-52.396 72.903-56.435 87.525-56.435.36 0 6.717-.065 6.717-.065.26-.002.549-.006.852-.006m0-9.038h-.017q-.498-.001-.944.004l-6.633.066c-8.566 0-25.705 1.21-44.115 9.336-10.526 4.643-19.994 10.921-28.14 18.66-9.712 9.221-17.624 20.59-23.512 33.796-8.623 19.336-6.576 51.905-4.932 78.078l.006.041c.176 2.803.361 5.73.53 8.582-1.265.581-3.316 1.194-6.339 1.194-4.864 0-10.648-1.555-17.187-4.619-1.924-.896-4.12-1.349-6.543-1.349-3.893 0-7.997 1.146-11.557 3.239-4.479 2.63-7.373 6.347-8.159 10.468-.518 2.726-.493 8.114 5.492 13.578 3.292 3.008 8.128 5.782 14.37 8.249 1.638.645 3.582 1.261 5.641 1.914 7.145 2.271 17.959 5.702 20.779 12.339 1.429 3.365.814 7.793-1.823 13.145-.069.146-.138.289-.201.439-.659 1.539-6.807 15.465-19.418 30.152-7.166 8.352-15.059 15.332-23.447 20.752-10.238 6.617-21.316 10.943-32.923 12.855a9.04 9.04 0 0 0-7.559 9.424c.078 1.33.39 2.656.931 3.939l.013.023c1.843 4.311 6.116 7.973 13.063 11.203 8.489 3.943 21.185 7.26 37.732 9.855.836 1.59 1.704 5.586 2.305 8.322.629 2.908 1.285 5.898 2.22 9.074 1.009 3.441 3.626 7.553 10.349 7.553 2.548 0 5.478-.574 8.871-1.232 4.969-.975 11.764-2.305 20.245-2.305 4.702 0 9.575.414 14.48 1.229 9.455 1.574 17.606 7.332 27.037 14 13.804 9.758 29.429 20.803 53.302 20.803.651 0 1.304-.021 1.949-.066.789.037 1.767.066 2.799.066 23.88 0 39.501-11.049 53.29-20.799l.022-.02c9.433-6.66 17.575-12.41 27.027-13.984 4.903-.814 9.775-1.229 14.479-1.229 8.102 0 14.517 1.033 20.245 2.15 3.738.736 6.643 1.09 8.872 1.09l.218.004h.226c4.917 0 8.53-2.699 9.909-7.422.916-3.109 1.57-6.029 2.215-8.986.562-2.564 1.46-6.674 2.296-8.281 16.558-2.6 29.249-5.91 37.739-9.852 6.931-3.215 11.199-6.873 13.053-11.166.556-1.287.881-2.621.954-3.979a9.036 9.036 0 0 0-7.56-9.424c-51.585-8.502-74.824-61.506-75.785-63.758a7 7 0 0 0-.205-.438c-2.637-5.354-3.246-9.777-1.816-13.148 2.814-6.631 13.621-10.062 20.771-12.332 2.07-.652 4.021-1.272 5.646-1.914 7.039-2.78 12.07-5.796 15.389-9.221 3.964-4.083 4.736-7.995 4.688-10.555-.121-6.194-4.856-11.698-12.388-14.393-2.544-1.052-5.445-1.607-8.399-1.607-2.011 0-4.989.276-7.808 1.592-6.035 2.824-11.441 4.368-16.082 4.588-2.468-.125-4.199-.66-5.32-1.171.141-2.416.297-4.898.458-7.486l.067-1.108c1.653-26.19 3.707-58.784-4.92-78.134-5.913-13.253-13.853-24.651-23.604-33.892-8.178-7.744-17.678-14.021-28.242-18.661-18.384-8.066-35.522-9.271-44.1-9.271"
      fill="#020202"
    />
    <Path
      d="M147.553 39.443h514.231v514.23H147.553z"
      fill="none"
    />
  </Svg>
);

const BrandFacebook = ({ size, ...props }: any) => (
  <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" {...props}>
    <Circle cx="12" cy="12" r="10" fill="#1877F2"/>
    <Path d="M13 10h2l-.5 3h-1.5v7h-3v-7h-1.5v-3h1.5v-1.5c0-1.5 1-2.5 2.5-2.5h2v3h-1c-.5 0-1 .5-1 1V10z" fill="#FFF"/>
  </Svg>
);

const BrandLinkedin = ({ size, ...props }: any) => (
  <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" {...props}>
    <Rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2"/>
    <Path d="M8 19H5V10h3v9zM6.5 8.5A1.5 1.5 0 1 1 8 7a1.5 1.5 0 0 1-1.5 1.5zM19 19h-3v-4.5c0-1.2-.5-2-1.5-2s-1.5.8-1.5 2V19h-3V10h3v1.5c.5-1 2-1.5 3-1.5 2 0 3 1.5 3 4.5V19z" fill="#FFF"/>
  </Svg>
);

const BrandTwitter = ({ size, ...props }: any) => (
  <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" {...props}>
    <Rect x="2" y="2" width="20" height="20" rx="4" fill="#000" stroke="#333" strokeWidth="1"/>
    <Path d="M15 7h2L12 11.5 17 17h-4.5l-3-4-3.5 4H4l4.5-5L4 7h4l2.5 3.5L15 7z" fill="#FFF"/>
  </Svg>
);

const BrandYoutube = ({ size, ...props }: any) => (
  <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" {...props}>
    <Rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000"/>
    <Polygon points="10 9 15.5 12 10 15 10 9" fill="#FFF"/>
  </Svg>
);

const BrandGithub = ({ size, ...props }: any) => (
  <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" {...props}>
    <Path d="M12 2A10 10 0 0 0 8.8 21.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1 .6-1.3-2.2-.2-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a10 10 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.5 5 .3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5A10 10 0 0 0 12 2z" fill="#FFF"/>
  </Svg>
);
const BrandSpotify = ({ size, ...props }: any) => (
  <Svg width={size || 32} height={size || 32} viewBox="0 0 496 512" {...props}>
    <Path
      fill="#1ed760"
      d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8"
    />
    <Path fill="#fff" d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3m-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5m-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4" />
  </Svg>
);

const BrandWhatsApp = ({ size, ...props }: any) => (
  <Svg
    width={size || 32}
    height={size || 32}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill="#BFC8D0"
      fillRule="evenodd"
      d="M16 31c7.732 0 14-6.268 14-14S23.732 3 16 3 2 9.268 2 17c0 2.51.661 4.867 1.818 6.905L2 31l7.315-1.696A13.94 13.94 0 0 0 16 31m0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 5.154 4.154 10.458 4.154 17c0 2.526.79 4.868 2.138 6.79L5.23 27.77l4.049-1.013a11.8 11.8 0 0 0 6.72 2.09"
      clipRule="evenodd"
    />
    <Path
      fill="url(#whatsapp_svg__a)"
      d="M28 16c0 6.627-5.373 12-12 12-2.528 0-4.873-.782-6.807-2.116L5.09 26.909l1.075-4.03A11.95 11.95 0 0 1 4 16C4 9.373 9.373 4 16 4s12 5.373 12 12"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M16 30c7.732 0 14-6.268 14-14S23.732 2 16 2 2 8.268 2 16c0 2.51.661 4.867 1.818 6.905L2 30l7.315-1.696A13.94 13.94 0 0 0 16 30m0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 4.154 4.154 9.458 4.154 16c0 2.526.79 4.868 2.138 6.79L5.23 26.77l4.049-1.013a11.8 11.8 0 0 0 6.72 2.09"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      d="M12.5 9.5c-.333-.669-.844-.61-1.36-.61-.921 0-2.359 1.105-2.359 3.16 0 1.684.742 3.528 3.243 6.286 2.414 2.662 5.585 4.039 8.218 3.992s3.175-2.313 3.175-3.078c0-.339-.21-.508-.356-.554-.897-.43-2.552-1.233-2.928-1.384-.377-.15-.573.054-.695.165-.342.325-1.019 1.284-1.25 1.5s-.578.106-.721.024c-.53-.212-1.964-.85-3.107-1.958-1.415-1.371-1.498-1.843-1.764-2.263-.213-.336-.057-.542.021-.632.305-.351.726-.894.914-1.164s.04-.679-.05-.934c-.387-1.097-.715-2.015-.981-2.55"
    />
    <Defs>
      <LinearGradient
        id="whatsapp_svg__a"
        x1={26.5}
        x2={4}
        y1={7}
        y2={28}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#5BD066" />
        <Stop offset={1} stopColor="#27B43E" />
      </LinearGradient>
    </Defs>
  </Svg>
);

import { apiClient } from '../../api/client';

export interface ProfileLink {
  id: string;
  platform: string;
  url: string;
  displayName?: string;
  showInPersonalProfile: boolean;
  showInProfessionalProfile: boolean;
}

const PLATFORMS = [
  { id: 'customurl', name: 'Custom URL', icon: Globe, color: '#A0A0A0', formatUrl: (val: string) => val.startsWith('http') ? val : `https://${val}` },
  { id: 'email', name: 'Email Address', icon: Mail, color: '#007AFF', formatUrl: (val: string) => `mailto:${val}` },
  { id: 'facebook', name: 'Facebook', icon: BrandFacebook, color: '#1877F2', formatUrl: (val: string) => val.includes('http') ? val : `https://facebook.com/${val}` },
  { id: 'github', name: 'GitHub', icon: BrandGithub, color: '#333333', formatUrl: (val: string) => val.includes('http') ? val : `https://github.com/${val.replace('@', '')}` },
  { id: 'instagram', name: 'Instagram', icon: BrandInstagram, color: '#E1306C', formatUrl: (val: string) => val.includes('http') ? val : `https://instagram.com/${val.replace('@', '')}` },
  { id: 'linkedin', name: 'LinkedIn', icon: BrandLinkedin, color: '#0077B5', formatUrl: (val: string) => val.includes('http') ? val : `https://linkedin.com/in/${val}` },
  { id: 'phone', name: 'Phone Number', icon: Phone, color: '#34C759', formatUrl: (val: string) => `tel:${val.replace(/\s+/g, '')}` },
  { id: 'snapchat', name: 'Snapchat', icon: BrandSnapchat, color: '#FFFC00', formatUrl: (val: string) => val.includes('http') ? val : `https://snapchat.com/add/${val.replace('@', '')}` },
  { id: 'spotify', name: 'Spotify', icon: BrandSpotify, color: '#1DB954', formatUrl: (val: string) => val.includes('http') ? val : `https://open.spotify.com/user/${val}` },
  { id: 'twitter', name: 'Twitter / X', icon: BrandTwitter, color: '#000000', formatUrl: (val: string) => val.includes('http') ? val : `https://x.com/${val.replace('@', '')}` },
  { id: 'whatsapp', name: 'WhatsApp', icon: BrandWhatsApp, color: '#25D366', formatUrl: (val: string) => `https://wa.me/${val.replace(/[^0-9]/g, '')}` },
  { id: 'youtube', name: 'YouTube', icon: BrandYoutube, color: '#FF0000', formatUrl: (val: string) => val.includes('http') ? val : `https://youtube.com/@${val.replace('@', '')}` },
];

// Premium Custom Switch Component
const PremiumSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => {
  const slideAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // color interpolation doesn't support native driver well sometimes
    }).start();
  }, [value]);

  const backgroundColor = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3A3A3C', theme.colors.primary] // Dark gray to Red
  });

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22] // Circle moves from left to right
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <Animated.View style={[styles.customSwitchTrack, { backgroundColor }]}>
        <Animated.View style={[styles.customSwitchThumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
};

export default function ManageLinksScreen() {
  const [links, setLinks] = useState<ProfileLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [platform, setPlatform] = useState('phone');
  const [inputValue, setInputValue] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPersonal, setShowPersonal] = useState(true);
  const [showProfessional, setShowProfessional] = useState(true);

  useEffect(() => { fetchLinks(); }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/users/links');
      setLinks(response.data.links || []);
    } catch (error) {
      console.error('Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setPlatform('phone');
    setInputValue('');
    setDisplayName('');
    setShowPersonal(true);
    setShowProfessional(true);
    setModalVisible(true);
  };

  const openEditModal = (link: ProfileLink) => {
    setEditingId(link.id);
    setPlatform(link.platform);
    
    // Attempt to reverse engineer the raw input value from the URL for better UX
    let rawVal = link.url;
    if (link.platform === 'phone' && rawVal.startsWith('tel:')) rawVal = rawVal.replace('tel:', '');
    if (link.platform === 'whatsapp' && rawVal.startsWith('https://wa.me/')) rawVal = rawVal.replace('https://wa.me/', '');
    if (link.platform === 'instagram' && rawVal.startsWith('https://instagram.com/')) rawVal = rawVal.replace('https://instagram.com/', '');
    
    setInputValue(rawVal);
    setDisplayName(link.displayName || '');
    setShowPersonal(link.showInPersonalProfile);
    setShowProfessional(link.showInProfessionalProfile);
    setModalVisible(true);
  };

  const saveLink = async () => {
    if (!inputValue || !platform) {
      Alert.alert('Error', 'Input value is required');
      return;
    }

    if (platform === 'customurl' && !displayName.trim()) {
      Alert.alert('Label Required', 'Please provide a Title / Label for your Custom URL so visitors know what they are clicking!');
      return;
    }

    const platformConfig = PLATFORMS.find(p => p.id === platform);
    const finalUrl = platformConfig ? platformConfig.formatUrl(inputValue) : inputValue;

    const payload = {
      platform, 
      url: finalUrl, 
      displayName, 
      showInPersonalProfile: showPersonal, 
      showInProfessionalProfile: showProfessional
    };

    setLoading(true);
    try {
      if (editingId) {
        await apiClient.put(`/api/users/links/${editingId}`, payload);
      } else {
        await apiClient.post('/api/users/links', payload);
      }
      setModalVisible(false);
      fetchLinks();
    } catch (error) {
      Alert.alert('Error', 'Failed to save link. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to permanently remove this link?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await apiClient.delete(`/api/users/links/${id}`);
            fetchLinks();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete link');
          }
        } 
      }
    ]);
  };

  const getPlatformIcon = (platformId: string) => {
    const plat = PLATFORMS.find(p => p.id === platformId);
    if (!plat) return <Globe color="#A0A0A0" size={24} />;
    const IconComponent = plat.icon;
    return <IconComponent color={plat.color} size={24} />;
  };

  const renderItem = ({ item }: { item: ProfileLink }) => (
    <View style={styles.card}>
      <View style={styles.cardIconBox}>
        {getPlatformIcon(item.platform)}
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.displayName || PLATFORMS.find(p=>p.id===item.platform)?.name || item.platform}</Text>
        <Text style={styles.cardUrl} numberOfLines={1}>{item.url}</Text>
        <View style={styles.badges}>
          {item.showInPersonalProfile && <Text style={styles.badgeLine}>Personal</Text>}
          {item.showInProfessionalProfile && <Text style={styles.badgeLine}>Professional</Text>}
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => openEditModal(item)}>
          <Edit2 color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => deleteLink(item.id)}>
          <Trash2 color={theme.colors.error} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={links}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading ? <Text style={styles.emptyText}>No links added yet. Tap the red + button to start.</Text> : null
        }
      />
      
      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <Plus color="#FFF" size={28} />
      </TouchableOpacity>

      {/* Sleek Bottom Sheet Style Modal */}
      <Modal 
        visible={modalVisible} 
        transparent 
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdropTap} onPress={() => setModalVisible(false)} activeOpacity={1} />
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingId ? 'Edit Link' : 'Add New Link'}</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                <X color={theme.colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
              <Text style={styles.label}>Choose Platform</Text>
              
              {/* Premium Dropdown Box */}
              <View style={styles.dropdownContainer}>
                <TouchableOpacity 
                  style={styles.dropdownHeader} 
                  activeOpacity={0.8}
                  onPress={() => setDropdownOpen(!dropdownOpen)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {getPlatformIcon(platform)}
                    <Text style={styles.dropdownHeaderText}>
                      {PLATFORMS.find(p => p.id === platform)?.name || 'Select Platform'}
                    </Text>
                  </View>
                  <ChevronDown color="#A0A0A0" size={20} style={{ transform: [{ rotate: dropdownOpen ? '180deg' : '0deg' }] }} />
                </TouchableOpacity>

                {dropdownOpen && (
                  <View style={styles.dropdownList}>
                    {PLATFORMS.map((p) => {
                      const isSelected = platform === p.id;
                      const IconComp = p.icon;
                      return (
                        <TouchableOpacity 
                          key={p.id} 
                          style={[styles.dropdownItem, isSelected && styles.dropdownItemActive]}
                          onPress={() => {
                            setPlatform(p.id);
                            setDropdownOpen(false);
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconComp color={isSelected ? theme.colors.primary : p.color} size={18} />
                            <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextActive]}>
                              {p.name}
                            </Text>
                          </View>
                          {isSelected && <Check color={theme.colors.primary} size={18} />}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>

              <Text style={styles.label}>
                {platform === 'phone' || platform === 'whatsapp' ? 'Phone Number (Include Country Code)' : 
                 platform === 'customurl' ? 'Full Website URL' : 'Username or URL'}
              </Text>
              <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType={platform === 'phone' || platform === 'whatsapp' ? 'phone-pad' : 'url'}
                autoCapitalize="none"
                placeholder={platform === 'phone' || platform === 'whatsapp' ? "+1 234 567 8900" : platform === 'instagram' ? "@username" : "https://..."}
                placeholderTextColor={theme.colors.textSecondary}
              />

              <Text style={styles.label}>
                {platform === 'customurl' ? 'Link Button Label / Title (Required)' : 'Display Name / Title (Optional)'}
              </Text>
              <TextInput
                style={styles.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder={platform === 'customurl' ? 'e.g., My Portfolio' : (PLATFORMS.find(p => p.id === platform)?.name || "My Link")}
                placeholderTextColor={theme.colors.textSecondary}
              />

              <View style={styles.visibilityCard}>
                <Text style={styles.visibilityHeader}>Profile Visibility Dashboard</Text>
                
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Show on Personal Profile</Text>
                  <PremiumSwitch value={showPersonal} onValueChange={setShowPersonal} />
                </View>

                <View style={[styles.switchRow, { borderBottomWidth: 0, marginBottom: 0 }]}>
                  <Text style={styles.switchLabel}>Show on Professional Profile</Text>
                  <PremiumSwitch value={showProfessional} onValueChange={setShowProfessional} />
                </View>
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={saveLink} disabled={loading}>
                <Text style={styles.saveBtnText}>{loading ? 'Saving securely...' : 'Save Profile Link'}</Text>
              </TouchableOpacity>
              <View style={{height: 40}} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  listContent: { padding: theme.spacing.lg, paddingBottom: 100 },
  emptyText: { ...theme.typography.body, textAlign: 'center', marginTop: 80, color: theme.colors.textSecondary },
  card: {
    backgroundColor: '#1E1E20', borderRadius: theme.borders.radius + 4,
    padding: theme.spacing.md, marginBottom: theme.spacing.md,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#2C2C2E',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3,
  },
  cardIconBox: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#111111',
    justifyContent: 'center', alignItems: 'center', marginRight: theme.spacing.md,
    borderWidth: 1, borderColor: '#2C2C2E'
  },
  cardInfo: { flex: 1 },
  cardTitle: { ...theme.typography.subheader, fontSize: 16, marginBottom: 2, color: '#F3F3F3' },
  cardUrl: { ...theme.typography.body, fontSize: 13, color: '#A0A0A0', marginBottom: 8 },
  badges: { flexDirection: 'row' },
  badgeLine: { fontSize: 11, fontWeight: '700', backgroundColor: '#333333', color: '#B0B0B0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginRight: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardActions: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8 },
  actionBtn: { padding: 8, marginLeft: 4 },
  fab: {
    position: 'absolute', bottom: 32, right: 32,
    width: 60, height: 60, borderRadius: 30, backgroundColor: theme.colors.primary,
    justifyContent: 'center', alignItems: 'center', elevation: 8,
    shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'flex-end' },
  modalBackdropTap: { flex: 1 },
  bottomSheet: { backgroundColor: theme.colors.card, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: theme.spacing.xl, paddingBottom: 20, maxHeight: '95%', shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.5, shadowRadius: 20 },
  sheetHandle: { width: 40, height: 5, backgroundColor: theme.colors.border, borderRadius: 10, alignSelf: 'center', marginTop: 12, marginBottom: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg },
  modalTitle: { ...theme.typography.header, fontSize: 22 },
  closeBtn: { padding: 6, backgroundColor: theme.colors.background, borderRadius: 16 },
  
  dropdownContainer: { marginBottom: 20, zIndex: 10 },
  dropdownHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1A1A1C', borderWidth: 1, borderColor: '#2C2C2E', borderRadius: 12, padding: 16 },
  dropdownHeaderText: { ...theme.typography.button, color: '#FFF', fontSize: 15, marginLeft: 12 },
  dropdownList: { marginTop: 8, backgroundColor: '#1A1A1C', borderWidth: 1, borderColor: '#2C2C2E', borderRadius: 12, overflow: 'hidden' },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#2C2C2E' },
  dropdownItemActive: { backgroundColor: '#232325' },
  dropdownItemText: { ...theme.typography.button, color: '#A0A0A0', fontSize: 14, marginLeft: 12 },
  dropdownItemTextActive: { color: '#FFF' },
  
  label: { ...theme.typography.button, color: '#D0D0D0', fontSize: 13, marginBottom: 8, marginTop: 4 },
  input: {
    backgroundColor: '#111111', 
    borderWidth: 1, borderColor: '#2C2C2E', borderRadius: 12,
    padding: 16, marginBottom: 20, ...theme.typography.body, color: '#FFF'
  },
  
  visibilityCard: { backgroundColor: '#111111', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#2C2C2E', marginBottom: 24 },
  visibilityHeader: { ...theme.typography.button, color: '#FFF', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, opacity: 0.6 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#2C2C2E' },
  switchLabel: { ...theme.typography.body, color: '#E0E0E0' },
  
  saveBtn: { backgroundColor: theme.colors.primary, padding: 18, borderRadius: 20, alignItems: 'center', shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  saveBtnText: { ...theme.typography.button, fontSize: 16 },
  
  customSwitchTrack: { width: 48, height: 26, borderRadius: 13, justifyContent: 'center' },
  customSwitchThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 }
});

