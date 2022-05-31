module.exports = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'quick-start',
        {
          type: 'category',
          label: 'Booting Methods',
          link: {
            type: 'generated-index',
            title: 'Booting Methods',
            description: 'Select your desired netboot.xyz boot method below:',
          },
          items: [
          'booting/usb',
          'booting/iso',
          'booting/ipxe',
          'booting/grub',
          'booting/qemu',
          'booting/tftp',
          'booting/vmware',
          ],
        },
      ],
    },
    'docker',
    'selfhosting',
    'faq',
    {
      type: 'category',
      label: 'Community',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'community/build-automation',
        'community/changelog',
        'community/contributing',
      ],
    },
    {
      type: 'category',
      label: 'Knowledgebase',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        { 
          "Networking": [
            'kb/networking/asuswrt-merlin',
            'kb/networking/edgerouter',
          ],
        },
        {
          "Provider Usage": [
            'kb/providers/digitalocean',
            'kb/providers/equinixmetal',
            'kb/providers/gce',
            'kb/providers/linode',
            'kb/providers/openstack',
            'kb/providers/vultr',
          ],
        },
        {    
          "PXE Usage": [
              'kb/pxe/ubuntu',
              'kb/pxe/windows',
          ],
        },
      ],
    },
  ],
};
