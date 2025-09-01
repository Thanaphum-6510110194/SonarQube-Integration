pipeline {
  agent any

  tools {
    nodejs 'NodeJS-24.7.0'
    jdk    'Temurin-17'   // ตอนนี้ต้องมีจริง และติดตั้งจาก Adoptium เรียบร้อย
    // sonarQubeScanner 'SonarScanner-6'  // ถ้าคุณตั้งไว้ใน Tools
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

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv('sonarqube-25.8.0.112029') {
          withEnv([
            "JAVA_HOME=${tool 'Temurin-17'}",
            "PATH+JAVA=${tool 'Temurin-17'}/bin"
            // ถ้าเพิ่ม SonarScanner เป็น Tool ด้วย:
            // ,"SCANNER_HOME=${tool 'SonarScanner-6'}",
            // "PATH+SCANNER=${tool 'SonarScanner-6'}/bin"
          ]) {
            sh '''
              java -version

              sonar-scanner \
                -Dsonar.projectKey=SonarQube-Integration-with-Jenkins \
                -Dsonar.projectName="SonarQube Integration with Jenkins" \
                -Dsonar.sources=. \
                -Dsonar.sourceEncoding=UTF-8 \
                -Dsonar.host.url=$SONAR_HOST_URL \
                -Dsonar.login=$SONAR_AUTH_TOKEN
            '''
          }
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
