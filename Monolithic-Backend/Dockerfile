FROM openjdk:24-jdk

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 7000

ENTRYPOINT ["java", "-jar", "app.jar"]