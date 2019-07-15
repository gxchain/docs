# 빠른 시작

## GXChain인식

GXChain은 중심적이고 고성능이며 생태계가 풍부한 관리형 체인로 GXChain 생태계에서 이사회, 공신절점, 코인 소지자들이 함께 체인을 완성합니다.

- **이사회**：공신절점 득표 상위 **11** GXChain 이사회 멤버로 선출되었으며, 주로 블록 체인 동적 파라미터의 수정을 담당합니다.
- **공신절점**：패킹, 검증거래 담당,  **1** 시간마다 투표 집계, 득표수 선정 전  **21** 개를 공신절점으로 합니다.
- **소지자**：임의의 수의 GXC를 가진 개체나 기관, 코인 소지자는 GXChain 생태계에 참여하여 공신절을 위해 투표할 수 있습니다.

GXChain 저변층은 DPoS 컨센서스 메커니즘에 기반한 그래핀 아키텍처를 사용하여 더 높은 성능을 자랑합니다.

- **블록 생성 시간**：**3** s
- **TPS**：천급

## 환경 요구사항

- 시스템: **macOS / Ubuntu 14.04 64-bit**, **4.4.0-63-generic** 이상의 내핵
- 메모리: 16GB+
- 하드 디스크: 100GB+
- 네트워크： 20MB+대역폭

::: warning 설치에 의존

* ntp 설치
``` bash
sudo apt-get install ntp
# macOS安装ntp:  brew install ntp
```

* libstdc++-7-dev 설치
```bash
# Ubuntu系统需要安装, macOS不需要
apt-get update
apt-get install software-properties-common
add-apt-repository ppa:ubuntu-toolchain-r/test
apt-get update
apt-get install libstdc++-7-dev
```

:::

## 절점 설치

아래의 절차는 주 네트워크 절점의 작동을 시연합니다

- 당신이 개발자라면 빠른 체험을 원하며 테스트 네트워크로 갈 수 있습니다
- 만약 당신이 GXChain에 기초해서 사유 체인을 만들고 싶다면, 사유 체인로 가서 건설할 수 있습니다.

### 1. Release 패키지 다운로드

``` bash
# 执行这个shell脚本，会自动从github下载最新的主网程序，并解压至当前目录下
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```

### 2. 절점 작동，데이터 동기화

``` bash
nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint="127.0.0.1:28090" 1>nohup.out 2>&1 &
```

위의 명령:
- 127.0.1:28090에 감청된 RPC 서비스가 가동되었습니다
- 지정된 블록 정보는 ./trusted_node 디렉토리 아래에 저장됩니다.

::: tip 우정 제시
- 동기식 블록은 대략 30+시간이 소요되는데, 물론 이것은 당신의 네트워크 상황과 어느 정도 관련이 있습니다
- 블록 동기화가 완료되기 전에, 당신은 참고 기다리기만 하면 되며, 그 사이에 문서를 한 번 읽을 수 있습니다.
:::

### 3. 일지를 살펴보고 데이터 동기화가 완료될 때까지 대기

``` bash
tail -f trusted_node/logs/witness.log
```

바이트 동기화가 완료되면 일지가 이렇게 보입니다(매 3초마다 네트워크에서 새 블록 1개를 수신):

``` bash
2018-06-28T03:43:03 th_a:invoke handle_block         handle_block ] Got block: #10731531 time: 2018-06-28T03:43:03 latency: 60 ms from: miner11  irreversible: 10731513 (-18)			application.cpp:489
2018-06-28T03:43:06 th_a:invoke handle_block         handle_block ] Got block: #10731532 time: 2018-06-28T03:43:06 latency: 16 ms from: taffy  irreversible: 10731515 (-17)			application.cpp:489
2018-06-28T03:43:09 th_a:invoke handle_block         handle_block ] Got block: #10731533 time: 2018-06-28T03:43:09 latency: 49 ms from: david12  irreversible: 10731515 (-18)			application.cpp:489
2018-06-28T03:43:12 th_a:invoke handle_block         handle_block ] Got block: #10731534 time: 2018-06-28T03:43:12 latency: 42 ms from: miner6  irreversible: 10731516 (-18)			application.cpp:489
2018-06-28T03:43:15 th_a:invoke handle_block         handle_block ] Got block: #10731535 time: 2018-06-28T03:43:15 latency: 10 ms from: sakura  irreversible: 10731516 (-19)			application.cpp:489
2018-06-28T03:43:18 th_a:invoke handle_block         handle_block ] Got block: #10731536 time: 2018-06-28T03:43:18 latency: 57 ms from: miner9  irreversible: 10731517 (-19)			application.cpp:489
2018-06-28T03:43:21 th_a:invoke handle_block         handle_block ] Got block: #10731537 time: 2018-06-28T03:43:21 latency: 56 ms from: robin-green  irreversible: 10731517 (-20)			application.cpp:489
2018-06-28T03:43:24 th_a:invoke handle_block         handle_block ] Got block: #10731538 time: 2018-06-28T03:43:24 latency: 17 ms from: kairos  irreversible: 10731522 (-16)			application.cpp:489
2018-06-28T03:43:27 th_a:invoke handle_block         handle_block ] Got block: #10731539 time: 2018-06-28T03:43:27 latency: 21 ms from: dennis1  irreversible: 10731524 (-15)			application.cpp:489
2018-06-28T03:43:30 th_a:invoke handle_block         handle_block ] Got block: #10731540 time: 2018-06-28T03:43:30 latency: 17 ms from: aaron  irreversible: 10731524 (-16)			application.cpp:489
2018-06-28T03:43:33 th_a:invoke handle_block         handle_block ] Got block: #10731541 time: 2018-06-28T03:43:33 latency: 23 ms from: caitlin  irreversible: 10731526 (-15)			application.cpp:489
```

## 계정 등록

GXChain은 계정 모델을 채택하고 있으며 추천 등록 메커니즘이 도입되었기 때문에 GXChain에 하나의 계정을 등록하려면 다음과 같은 세 가지 요소가 필요합니다.

- **추천인**，추천인은 체인에 이미 존재하는 계정입니다. 당신의 계좌명과 키를 사용하여 당신의 계정을 등록해 드리겠습니다.
- **계정명**，계좌명은 체인에서 유일한 것이므로 GXChain에서 계좌명 즉 주소를 기억하십시오 (gxchain-genius와 같이).
- **ECC 공키**，GXC로 시작하는 Base64 인코딩된 ECC 공키 (공키를 어떻게 생성합니까?걱정하지 말고 뒤로 봐주세요)

계정의 등록을 완료할 수 있는 두 가지 방식이 있습니다:

### 1. 온라인 지갑

온라인 지갑https://wallet.gxb.io 사용하여 인터페이스에서 위 단계 완료

### 2. 수동 등록

사키 보안에 대한 요구가 높은 개발자가 이러한 방식을 사용하여 등록을 완료하도록 추천함으로써, 사키가 오프라인임을 보증합니다.

#### 단계 1: cli_wallet을 통해 공유 키 쌍 생성

``` bash
./programs/cli_wallet/cli_wallet --suggest-brain-key
{
  "brain_priv_key": "SHAP CASCADE AIRLIKE WRINKLE CUNETTE FROWNY MISREAD MOIST HANDSET COLOVE EMOTION UNSPAN SEAWARD HAGGIS TEENTY NARRAS",
  "wif_priv_key": "5J2FpCq3UmvcodkCCofXSNvHYTodufbPajwpoEFAh2TJf27EuL3",
  "pub_key": "GXC75UwALPEFECfHLjHyNSxCk1j7XzSvApQiXKEbanWgr7yvXXbdG"
}
```

::: tip 자구 해석
- brain_priv_key: 도움말, 개인 키의 원본 텍스트로, 도움말을 통해 개인 키를 환원할 수 있습니다.
- wif_priv_key: 사키, 프로그램에서 사용
- pub_key: 공유 키, 체인 계정 등록에 사용
:::

####  단계 2: 수도꼭지를 통해 계정 등록 완료

1. gxchain-genius와 같은 고유한 계정명(account_name)을 생각하기
2. 음 curl 명령에 있는 `<account_name>` and `<public_key>` 를 교체하고 단말기에서 다음을 수행합니다.

``` bash
curl 'https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json' -d '{"account":{"name":"<account_name>","owner_key":"<public_key>","active_key":"<public_key>","memo_key":"<public_key>","refcode":null,"referrer":null}}'
```
