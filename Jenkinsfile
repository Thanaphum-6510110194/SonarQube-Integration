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
            sh '''
                npx sonarqube-scanner \
                -Dsonar.projectKey=SonarQube-Integration-with-Jenkins \
                -Dsonar.projectName="SonarQube Integration with Jenkins" \
                -Dsonar.sources=. \
                -Dsonar.sourceEncoding=UTF-8 \
                -Dsonar.host.url="$SONAR_HOST_URL" \
                -Dsonar.token="$SONAR_AUTH_TOKEN"
            '''
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
