pipeline {
  agent any

  tools {
    nodejs 'NodeJS-24.7.0'
    jdk    'Temurin-17'   // ต้องมีจริง และติดตั้งผ่าน Temurin installer แล้ว
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Thanaphum-6510110194/SonarQube-Integration.git'
      }
    }

    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Check Java') {
      steps {
        withEnv([
          "JAVA_HOME=${tool 'Temurin-17'}",
          "PATH+JAVA=${tool 'Temurin-17'}/bin"
        ]) {
          sh 'java -version'
        }
      }
    }

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv('sonarqube-25.8.0.112029') {
          // ถ้าคุณเพิ่ม SonarScanner เป็น Tool ไว้ชื่อ SonarScanner-6:
          withEnv([
            "JAVA_HOME=${tool 'Temurin-17'}",
            "PATH+JAVA=${tool 'Temurin-17'}/bin",
            "SCANNER_HOME=${tool 'SonarScanner-6'}",
            "PATH+SCANNER=${tool 'SonarScanner-6'}/bin"
          ]) {
            sh '''
              sonar-scanner \
                -Dsonar.projectKey=SonarQube-Integration-with-Jenkins \
                -Dsonar.projectName="SonarQube Integration with Jenkins" \
                -Dsonar.sources=. \
                -Dsonar.sourceEncoding=UTF-8 \
                -Dsonar.host.url=$SONAR_HOST_URL \
                -Dsonar.login=$SONAR_AUTH_TOKEN
            '''
          }

          // ถ้ายังไม่ได้ตั้ง SonarScanner เป็น Tool ก็ใช้ npx เวอร์ชันใหม่ได้ (อย่าลืม JAVA_HOME เป็น 17):
          // withEnv(["JAVA_HOME=${tool 'Temurin-17'}","PATH+JAVA=${tool 'Temurin-17'}/bin"]) {
          //   sh '''
          //     npx -y sonar-scanner@5.0.1 \
          //       -Dsonar.projectKey=SonarQube-Integration-with-Jenkins \
          //       -Dsonar.projectName="SonarQube Integration with Jenkins" \
          //       -Dsonar.sources=. \
          //       -Dsonar.sourceEncoding=UTF-8 \
          //       -Dsonar.host.url=$SONAR_HOST_URL \
          //       -Dsonar.login=$SONAR_AUTH_TOKEN
          //   '''
          // }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
